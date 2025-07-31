'use client'

import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Package, DollarSign, AlertTriangle, Hash } from 'lucide-react'
import Link from 'next/link'
import { LoadingCard } from '@/components/ui/loading'

interface ProductsListProps {
  userId: string
}

const getStockStatus = (quantidade: number, qtdMinima: number) => {
  if (quantidade <= 0) return { status: 'sem-estoque', text: 'Sem Estoque', color: 'bg-red-100 text-red-800' }
  if (quantidade <= qtdMinima) return { status: 'baixo', text: 'Estoque Baixo', color: 'bg-yellow-100 text-yellow-800' }
  return { status: 'ok', text: 'Em Estoque', color: 'bg-green-100 text-green-800' }
}

export default function ProductsList({ userId }: ProductsListProps) {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products', userId],
    queryFn: () => getProducts(userId),
    enabled: !!userId,
  })

  if (isLoading) {
    return <LoadingCard />
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar produtos</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Package className="h-12 w-12" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
        <p className="text-gray-600 mb-6">
          Comece adicionando seu primeiro produto para gerenciar seu estoque.
        </p>
        <Button asChild>
          <Link href="/products/new">
            Adicionar Primeiro Produto
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {products.map((product) => {
        const stockStatus = getStockStatus(product.quantidade, product.qtd_minima_alerta)
        const valorEstoque = product.quantidade * product.valor_compra
        const margemLucro = ((product.valor_venda - product.valor_compra) / product.valor_compra) * 100

        return (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{product.nome}</h3>
                      <Badge className={stockStatus.color}>
                        {stockStatus.text}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Hash className="h-4 w-4 mr-1" />
                        {product.codigo_estoque}
                      </div>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        {product.quantidade} {product.unidade}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        R$ {product.valor_venda.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Compra: R$ {product.valor_compra.toFixed(2)}</span>
                      <span>Margem: {margemLucro.toFixed(1)}%</span>
                      <span>Estoque: R$ {valorEstoque.toFixed(2)}</span>
                      {product.locacao && (
                        <span>Local: {product.locacao}</span>
                      )}
                    </div>

                    {product.quantidade <= product.qtd_minima_alerta && (
                      <div className="flex items-center mt-2 text-yellow-600 text-sm">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Estoque baixo! Mínimo: {product.qtd_minima_alerta} {product.unidade}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/products/${product.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 