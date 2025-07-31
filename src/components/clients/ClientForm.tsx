'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient, updateClient, ClientInsert, ClientUpdate } from '@/lib/clients'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingButton } from '@/components/ui/loading'
import { User, Mail, Phone, Camera } from 'lucide-react'

interface ClientFormProps {
  userId: string
  client?: {
    id: string
    nome: string
    email: string | null
    telefone: string | null
    avatar_url: string | null
  }
  mode?: 'create' | 'edit'
}

export default function ClientForm({ userId, client, mode = 'create' }: ClientFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    nome: client?.nome || '',
    email: client?.email || '',
    telefone: client?.telefone || '',
    avatar_url: client?.avatar_url || ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const createMutation = useMutation({
    mutationFn: (data: ClientInsert) => createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients', userId] })
      router.push('/clients')
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ClientUpdate }) => 
      updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients', userId] })
      router.push('/clients')
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
      const clientData = {
        user_id: userId,
        nome: formData.nome.trim(),
        email: formData.email.trim() || null,
        telefone: formData.telefone.trim() || null,
        avatar_url: formData.avatar_url.trim() || null,
        criado_em: new Date().toISOString()
      }

      if (mode === 'create') {
        await createMutation.mutateAsync(clientData)
      } else if (client) {
        await updateMutation.mutateAsync({
          id: client.id,
          data: {
            nome: clientData.nome,
            email: clientData.email,
            telefone: clientData.telefone,
            avatar_url: clientData.avatar_url
          }
        })
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
      setError('Erro ao salvar cliente')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
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
            <User className="h-4 w-4 mr-2 inline" />
            Nome Completo *
          </Label>
          <Input
            id="nome"
            type="text"
            value={formData.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
            placeholder="Nome completo do cliente"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            <Mail className="h-4 w-4 mr-2 inline" />
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="cliente@email.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefone">
            <Phone className="h-4 w-4 mr-2 inline" />
            Telefone
          </Label>
          <Input
            id="telefone"
            type="tel"
            value={formData.telefone}
            onChange={(e) => handleInputChange('telefone', e.target.value)}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="avatar_url">
            <Camera className="h-4 w-4 mr-2 inline" />
            URL da Foto (opcional)
          </Label>
          <Input
            id="avatar_url"
            type="url"
            value={formData.avatar_url}
            onChange={(e) => handleInputChange('avatar_url', e.target.value)}
            placeholder="https://exemplo.com/foto.jpg"
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
            mode === 'create' ? 'Criar Cliente' : 'Atualizar Cliente'
          )}
        </Button>
      </div>
    </form>
  )
} 