'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, updateProduct, ProductInsert, ProductUpdate } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingButton } from '@/components/ui/loading'
import { Package, DollarSign, Hash, Box, MapPin, AlertTriangle, Calculator } from 'lucide-react'

interface ProductFormProps {
  userId: string
  product?: {
    id: string
    nome: string
    codigo_estoque: string
    codigo_original: string | null
    valor_compra: number
    valor_venda: number
    quantidade: number
    unidade: string
    locacao: string | null
    qtd_minima_alerta: number
  }
  mode?: 'create' | 'edit'
}

export default function ProductForm({ userId, product, mode = 'create' }: ProductFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    nome: product?.nome || '',
    codigo_estoque: product?.codigo_estoque || '',
    codigo_original: product?.codigo_original || '',
    valor_compra: product?.valor_compra || 0,
    valor_venda: product?.valor_venda || 0,
    quantidade: product?.quantidade || 0,
    unidade: product?.unidade || 'un',
    locacao: product?.locacao || '',
    qtd_minima_alerta: product?.qtd_minima_alerta || 5
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Calcular margem de lucro
  const margemLucro = formData.valor_venda > 0 && formData.valor_compra > 0 
    ? ((formData.valor_venda - formData.valor_compra) / formData.valor_venda * 100).toFixed(2)
    : '0'

  // Verificar se estoque está baixo
  const estoqueBaixo = formData.quantidade <= formData.qtd_minima_alerta

  const createMutation = useMutation({
    mutationFn: (data: ProductInsert) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', userId] })
      router.push('/products')
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductUpdate }) => 
      updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', userId] })
      router.push('/products')
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
      const productData = {
        user_id: userId,
        nome: formData.nome.trim(),
        codigo_estoque: formData.codigo_estoque.trim(),
        codigo_original: formData.codigo_original.trim() || null,
        valor_compra: Number(formData.valor_compra),
        valor_venda: Number(formData.valor_venda),
        quantidade: Number(formData.quantidade),
        unidade: formData.unidade,
        locacao: formData.locacao.trim() || null,
        qtd_minima_alerta: Number(formData.qtd_minima_alerta),
        ativo: true,
        criado_em: new Date().toISOString()
      }

      if (mode === 'create') {
        await createMutation.mutateAsync(productData)
      } else if (product) {
        await updateMutation.mutateAsync({
          id: product.id,
          data: {
            nome: productData.nome,
            codigo_estoque: productData.codigo_estoque,
            codigo_original: productData.codigo_original,
            valor_compra: productData.valor_compra,
            valor_venda: productData.valor_venda,
            quantidade: productData.quantidade,
            unidade: productData.unidade,
            locacao: productData.locacao,
            qtd_minima_alerta: productData.qtd_minima_alerta
          }
        })
      }
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
      setError('Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Informações básicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Produto *</Label>
          <Input
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            required
            placeholder="Ex: Shampoo Profissional"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="codigo_estoque">Código de Estoque *</Label>
          <Input
            id="codigo_estoque"
            value={formData.codigo_estoque}
            onChange={(e) => setFormData({ ...formData, codigo_estoque: e.target.value })}
            required
            placeholder="Ex: SH001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="codigo_original">Código Original</Label>
          <Input
            id="codigo_original"
            value={formData.codigo_original}
            onChange={(e) => setFormData({ ...formData, codigo_original: e.target.value })}
            placeholder="Ex: MANUFACTURER-001"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unidade">Unidade *</Label>
          <Input
            id="unidade"
            value={formData.unidade}
            onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
            required
            placeholder="Ex: un, kg, ml"
          />
        </div>
      </div>

      {/* Valores e estoque */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="valor_compra">Valor de Compra (R$) *</Label>
          <Input
            id="valor_compra"
            type="number"
            step="0.01"
            min="0"
            value={formData.valor_compra}
            onChange={(e) => setFormData({ ...formData, valor_compra: Number(e.target.value) })}
            required
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="valor_venda">Valor de Venda (R$) *</Label>
          <Input
            id="valor_venda"
            type="number"
            step="0.01"
            min="0"
            value={formData.valor_venda}
            onChange={(e) => setFormData({ ...formData, valor_venda: Number(e.target.value) })}
            required
            placeholder="0.00"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantidade">Quantidade em Estoque *</Label>
          <Input
            id="quantidade"
            type="number"
            min="0"
            value={formData.quantidade}
            onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })}
            required
            placeholder="0"
          />
        </div>
      </div>

      {/* Cálculos automáticos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Calculator className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">Margem de Lucro</span>
          </div>
          <p className="text-2xl font-bold text-blue-600">{margemLucro}%</p>
        </div>

        {estoqueBaixo && (
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-900">Alerta de Estoque</span>
            </div>
            <p className="text-sm text-red-600">Quantidade abaixo do mínimo</p>
          </div>
        )}
      </div>

      {/* Configurações adicionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="locacao">Localização no Estoque</Label>
          <Input
            id="locacao"
            value={formData.locacao}
            onChange={(e) => setFormData({ ...formData, locacao: e.target.value })}
            placeholder="Ex: Prateleira A, Gaveta 3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="qtd_minima_alerta">Quantidade Mínima para Alerta</Label>
          <Input
            id="qtd_minima_alerta"
            type="number"
            min="0"
            value={formData.qtd_minima_alerta}
            onChange={(e) => setFormData({ ...formData, qtd_minima_alerta: Number(e.target.value) })}
            placeholder="5"
          />
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex justify-end space-x-4 pt-6 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <LoadingButton />
          ) : (
            <>
              <Package className="h-4 w-4 mr-2" />
              {mode === 'create' ? 'Criar Produto' : 'Atualizar Produto'}
            </>
          )}
        </Button>
      </div>
    </form>
  )
} 