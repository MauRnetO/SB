'use client'

import { useQuery } from '@tanstack/react-query'
import { getClients } from '@/lib/clients'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Edit, Trash2, Phone, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'
import { LoadingCard } from '@/components/ui/loading'

interface ClientsListProps {
  userId: string
}

export default function ClientsList({ userId }: ClientsListProps) {
  const { data: clients, isLoading, error } = useQuery({
    queryKey: ['clients', userId],
    queryFn: () => getClients(userId),
    enabled: !!userId,
  })

  if (isLoading) {
    return <LoadingCard />
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar clientes</p>
      </div>
    )
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
        <p className="text-gray-600 mb-6">
          Comece adicionando seu primeiro cliente para gerenciar seus contatos.
        </p>
        <Button asChild>
          <Link href="/clients/new">
            Adicionar Primeiro Cliente
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <Card key={client.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={client.avatar_url || undefined} />
                  <AvatarFallback>
                    {client.nome.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{client.nome}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    {client.email && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {client.email}
                      </div>
                    )}
                    {client.telefone && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {client.telefone}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Cadastrado em {new Date(client.criado_em).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/clients/${client.id}/edit`}>
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