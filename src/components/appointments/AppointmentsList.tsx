'use client'

import { useQuery } from '@tanstack/react-query'
import { getAppointments } from '@/lib/appointments'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, Calendar, Clock, User, Package, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { LoadingCard } from '@/components/ui/loading'

interface AppointmentsListProps {
  userId: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pendente':
      return 'bg-yellow-100 text-yellow-800'
    case 'confirmado':
      return 'bg-green-100 text-green-800'
    case 'concluido':
      return 'bg-blue-100 text-blue-800'
    case 'cancelado':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pendente':
      return 'Pendente'
    case 'confirmado':
      return 'Confirmado'
    case 'concluido':
      return 'Concluído'
    case 'cancelado':
      return 'Cancelado'
    default:
      return status
  }
}

export default function AppointmentsList({ userId }: AppointmentsListProps) {
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments', userId],
    queryFn: () => getAppointments(userId),
    enabled: !!userId,
  })

  if (isLoading) {
    return <LoadingCard />
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Erro ao carregar agendamentos</p>
      </div>
    )
  }

  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Calendar className="h-12 w-12" />
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
        <p className="text-gray-600 mb-6">
          Comece criando seu primeiro agendamento para organizar sua agenda.
        </p>
        <Button asChild>
          <Link href="/appointments/new">
            Criar Primeiro Agendamento
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => {
        const appointmentDate = new Date(appointment.data_hora)
        const totalValue = Array.isArray(appointment.services) 
          ? appointment.services.reduce((sum: number, service: any) => sum + (service.valor || 0), 0)
          : 0

        return (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.clients?.nome || 'Cliente não encontrado'}
                      </h3>
                      <Badge className={getStatusColor(appointment.status)}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointmentDate.toLocaleDateString('pt-BR')} às {appointmentDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1" />
                        {Array.isArray(appointment.services) ? appointment.services.length : 0} serviço(s)
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        R$ {totalValue.toFixed(2)}
                      </div>
                    </div>

                    {Array.isArray(appointment.services) && appointment.services.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {appointment.services.map((service: any, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service.nome}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/appointments/${appointment.id}/edit`}>
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