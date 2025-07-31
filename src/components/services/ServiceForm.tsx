'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createService, updateService, ServiceInsert, ServiceUpdate } from '@/lib/services'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingButton } from '@/components/ui/loading'
import { Package, DollarSign, Clock, Tag, FileText } from 'lucide-react'

interface ServiceFormProps {
  userId: string
  service?: {
    id: string
    nome: string
    descricao: string | null
    valor: number
    duracao_minutos: number
    categoria: string
    imagem_url: string | null
  }
  mode?: 'create' | 'edit'
}

export default function ServiceForm({ userId, service, mode = 'create' }: ServiceFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    nome: service?.nome || '',
    descricao: service?.descricao || '',
    valor: service?.valor || 0,
    duracao_minutos: service?.duracao_minutos || 30,
    categoria: service?.categoria || '',
    imagem_url: service?.imagem_url || ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createMutation = useMutation({
    mutationFn: (data: ServiceInsert) => createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', userId] })
      router.push('/services')
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServiceUpdate }) => 
      updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services', userId] })
      router.push('/services')
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const serviceData = {
        user_id: userId,
        nome: formData.nome.trim(),
        descricao: formData.descricao.trim() || null,
        valor: parseFloat(formData.valor.toString()),
        duracao_minutos: parseInt(formData.duracao_minutos.toString()),
        categoria: formData.categoria.trim() || 'Geral',
        imagem_url: formData.imagem_url.trim() || null,
        ativo: true,
        criado_em: new Date().toISOString()
      }

      if (mode === 'create') {
        await createMutation.mutateAsync(serviceData)
      } else if (service) {
        await updateMutation.mutateAsync({
          id: service.id,
          data: {
            nome: serviceData.nome,
            descricao: serviceData.descricao,
            valor: serviceData.valor,
            duracao_minutos: serviceData.duracao_minutos,
            categoria: serviceData.categoria,
            imagem_url: serviceData.imagem_url
          }
        })
      }
    } catch (error) {
      console.error('Erro ao salvar serviço:', error)
      setError('Erro ao salvar serviço')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">
            <Package className="h-4 w-4 mr-2 inline" />
            Nome do Serviço *
          </Label>
          <Input
            id="nome"
            type="text"
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            placeholder="Ex: Corte de cabelo"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">
            <FileText className="h-4 w-4 mr-2 inline" />
            Descrição
          </Label>
          <Textarea
            id="descricao"
            value={formData.descricao}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange('descricao', e.target.value)}
            placeholder="Descreva o serviço..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="valor">
              <DollarSign className="h-4 w-4 mr-2 inline" />
              Valor (R$) *
            </Label>
            <Input
              id="valor"
              type="number"
              step="0.01"
              min="0"
              value={formData.valor}
              onChange={(e) => handleInputChange('valor', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duracao_minutos">
              <Clock className="h-4 w-4 mr-2 inline" />
              Duração (minutos) *
            </Label>
            <Input
              id="duracao_minutos"
              type="number"
              min="1"
              value={formData.duracao_minutos}
              onChange={(e) => handleInputChange('duracao_minutos', parseInt(e.target.value) || 30)}
              placeholder="30"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="categoria">
            <Tag className="h-4 w-4 mr-2 inline" />
            Categoria
          </Label>
          <Input
            id="categoria"
            type="text"
            value={formData.categoria}
            onChange={(e) => handleInputChange('categoria', e.target.value)}
            placeholder="Ex: Cabelo, Barba, Manicure..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imagem_url">
            URL da Imagem (opcional)
          </Label>
          <Input
            id="imagem_url"
            type="url"
            value={formData.imagem_url}
            onChange={(e) => handleInputChange('imagem_url', e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading || !formData.nome.trim()}>
          {loading ? (
            <LoadingButton />
          ) : (
            mode === 'create' ? 'Criar Serviço' : 'Atualizar Serviço'
          )}
        </Button>
      </div>
    </form>
  )
} 