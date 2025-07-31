'use client'

import { useQuery } from '@tanstack/react-query'
import { getServices } from '@/lib/services'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Package, DollarSign, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import { LoadingCard } from '@/components/ui/loading'

interface ServicesListProps {
  userId: string
}

export default function ServicesList({ userId }: ServicesListProps) {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services', userId],
    queryFn: () => getServices(userId),
    enabled: !!userId,
  })

  if (isLoading) {
    return <LoadingCard />
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar serviços</p>
      </div>
    )
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Package className="h-12 w-12" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum serviço encontrado</h3>
        <p className="text-gray-600 mb-6">
          Comece adicionando seu primeiro serviço para gerenciar seus atendimentos.
        </p>
        <Button asChild>
          <Link href="/services/new">
            Adicionar Primeiro Serviço
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Card key={service.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{service.nome}</h3>
                  {service.descricao && (
                    <p className="text-sm text-gray-600 mt-1">{service.descricao}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      R$ {service.valor.toFixed(2)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duracao_minutos} min
                    </div>
                    {service.categoria && (
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        <Badge variant="secondary">{service.categoria}</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/services/${service.id}/edit`}>
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
      ))}
    </div>
  )
} 