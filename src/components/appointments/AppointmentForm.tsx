'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createAppointment, updateAppointment, AppointmentInsert, AppointmentUpdate, getAvailableSlots } from '@/lib/appointments'
import { getClients } from '@/lib/clients'
import { getServices } from '@/lib/services'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { LoadingButton } from '@/components/ui/loading'
import { Calendar, Clock, User, Package, DollarSign, Check } from 'lucide-react'

interface AppointmentFormProps {
  userId: string
  appointment?: {
    id: string
    cliente_id: string
    servicos_ids: string[]
    data_hora: string
    duracao_total: number
    status: string
  }
  mode?: 'create' | 'edit'
}

export default function AppointmentForm({ userId, appointment, mode = 'create' }: AppointmentFormProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    cliente_id: appointment?.cliente_id || '',
    servicos_ids: appointment?.servicos_ids || [],
    data: appointment ? new Date(appointment.data_hora).toISOString().split('T')[0] : '',
    hora: appointment ? new Date(appointment.data_hora).toTimeString().slice(0, 5) : '',
    status: appointment?.status || 'pendente'
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])

  // Buscar clientes
  const { data: clients } = useQuery({
    queryKey: ['clients', userId],
    queryFn: () => getClients(userId),
    enabled: !!userId,
  })

  // Buscar serviços
  const { data: services } = useQuery({
    queryKey: ['services', userId],
    queryFn: () => getServices(userId),
    enabled: !!userId,
  })

  // Buscar horários disponíveis quando data e serviços mudam
  useEffect(() => {
    if (formData.data && formData.servicos_ids.length > 0) {
      const totalDuration = formData.servicos_ids.reduce((total, serviceId) => {
        const service = services?.find(s => s.id === serviceId)
        return total + (service?.duracao_minutos || 0)
      }, 0)

      if (totalDuration > 0) {
        getAvailableSlots(userId, formData.data, totalDuration)
          .then(slots => setAvailableSlots(slots))
          .catch(err => console.error('Erro ao buscar horários:', err))
      }
    }
  }, [formData.data, formData.servicos_ids, userId, services])

  const createMutation = useMutation({
    mutationFn: (data: AppointmentInsert) => createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', userId] })
      router.push('/appointments')
    },
    onError: (error: Error) => {
      setError(error.message)
      setLoading(false)
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AppointmentUpdate }) => 
      updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', userId] })
      router.push('/appointments')
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
      const totalDuration = formData.servicos_ids.reduce((total, serviceId) => {
        const service = services?.find(s => s.id === serviceId)
        return total + (service?.duracao_minutos || 0)
      }, 0)

      const appointmentData = {
        user_id: userId,
        cliente_id: formData.cliente_id,
        servicos_ids: formData.servicos_ids,
        data_hora: new Date(`${formData.data}T${formData.hora}`).toISOString(),
        duracao_total: totalDuration,
        status: formData.status,
        criado_em: new Date().toISOString()
      }

      if (mode === 'create') {
        await createMutation.mutateAsync(appointmentData)
      } else if (appointment) {
        await updateMutation.mutateAsync({
          id: appointment.id,
          data: {
            cliente_id: appointmentData.cliente_id,
            servicos_ids: appointmentData.servicos_ids,
            data_hora: appointmentData.data_hora,
            duracao_total: appointmentData.duracao_total,
            status: appointmentData.status
          }
        })
      }
    } catch (error) {
      console.error('Erro ao salvar agendamento:', error)
      setError('Erro ao salvar agendamento')
    } finally {
      setLoading(false)
    }
  }

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      servicos_ids: prev.servicos_ids.includes(serviceId)
        ? prev.servicos_ids.filter(id => id !== serviceId)
        : [...prev.servicos_ids, serviceId]
    }))
  }

  const totalValue = formData.servicos_ids.reduce((total, serviceId) => {
    const service = services?.find(s => s.id === serviceId)
    return total + (service?.valor || 0)
  }, 0)

  const totalDuration = formData.servicos_ids.reduce((total, serviceId) => {
    const service = services?.find(s => s.id === serviceId)
    return total + (service?.duracao_minutos || 0)
  }, 0)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seleção de Cliente */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cliente_id">
              <User className="h-4 w-4 mr-2 inline" />
              Cliente *
            </Label>
            <select
              id="cliente_id"
              value={formData.cliente_id}
              onChange={(e) => setFormData(prev => ({ ...prev, cliente_id: e.target.value }))}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Selecione um cliente</option>
              {clients?.map(client => (
                <option key={client.id} value={client.id}>
                  {client.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Data e Hora */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data">
                <Calendar className="h-4 w-4 mr-2 inline" />
                Data *
              </Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hora">
                <Clock className="h-4 w-4 mr-2 inline" />
                Hora *
              </Label>
              <select
                id="hora"
                value={formData.hora}
                onChange={(e) => setFormData(prev => ({ ...prev, hora: e.target.value }))}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Selecione um horário</option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="pendente">Pendente</option>
              <option value="confirmado">Confirmado</option>
              <option value="concluido">Concluído</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>
        </div>

        {/* Seleção de Serviços */}
        <div className="space-y-4">
          <Label>
            <Package className="h-4 w-4 mr-2 inline" />
            Serviços *
          </Label>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {services?.map(service => (
              <label key={service.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.servicos_ids.includes(service.id)}
                  onChange={() => handleServiceToggle(service.id)}
                  className="rounded"
                />
                <div className="flex-1">
                  <div className="font-medium">{service.nome}</div>
                  <div className="text-sm text-gray-600">
                    R$ {service.valor.toFixed(2)} • {service.duracao_minutos} min
                  </div>
                </div>
              </label>
            ))}
          </div>

          {/* Resumo */}
          {formData.servicos_ids.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Resumo do Agendamento</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total de Serviços:</span>
                  <span>{formData.servicos_ids.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duração Total:</span>
                  <span>{totalDuration} min</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Valor Total:</span>
                  <span>R$ {totalValue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
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
        <Button 
          type="submit" 
          disabled={loading || !formData.cliente_id || formData.servicos_ids.length === 0 || !formData.data || !formData.hora}
        >
          {loading ? (
            <LoadingButton />
          ) : (
            mode === 'create' ? 'Criar Agendamento' : 'Atualizar Agendamento'
          )}
        </Button>
      </div>
    </form>
  )
} 