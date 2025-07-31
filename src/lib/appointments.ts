import { supabase } from './supabase'
import { Database } from './supabase'

export type Appointment = Database['public']['Tables']['appointments']['Row'] & {
  clients?: {
    nome: string
    email: string | null
    telefone: string | null
  } | null
  services?: Array<{
    id: string
    nome: string
    valor: number
    duracao_minutos: number
  }> | null
}

export type AppointmentInsert = Database['public']['Tables']['appointments']['Insert']
export type AppointmentUpdate = Database['public']['Tables']['appointments']['Update']

// Buscar todos os agendamentos do usuário
export async function getAppointments(userId: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      clients:cliente_id(nome, email, telefone),
      services:servicos_ids(id, nome, valor, duracao_minutos)
    `)
    .eq('user_id', userId)
    .order('data_hora', { ascending: true })

  if (error) {
    console.error('Erro ao buscar agendamentos:', error)
    throw new Error('Erro ao buscar agendamentos')
  }

  return data || []
}

// Buscar agendamentos por data
export async function getAppointmentsByDate(userId: string, date: string): Promise<Appointment[]> {
  const startOfDay = new Date(date)
  startOfDay.setHours(0, 0, 0, 0)
  
  const endOfDay = new Date(date)
  endOfDay.setHours(23, 59, 59, 999)

  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      clients:cliente_id(nome, email, telefone),
      services:servicos_ids(id, nome, valor, duracao_minutos)
    `)
    .eq('user_id', userId)
    .gte('data_hora', startOfDay.toISOString())
    .lte('data_hora', endOfDay.toISOString())
    .order('data_hora', { ascending: true })

  if (error) {
    console.error('Erro ao buscar agendamentos por data:', error)
    throw new Error('Erro ao buscar agendamentos por data')
  }

  return data || []
}

// Buscar agendamento específico
export async function getAppointment(id: string, userId: string): Promise<Appointment | null> {
  const { data, error } = await supabase
    .from('appointments')
    .select(`
      *,
      clients:cliente_id(nome, email, telefone),
      services:servicos_ids(id, nome, valor, duracao_minutos)
    `)
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Erro ao buscar agendamento:', error)
    throw new Error('Erro ao buscar agendamento')
  }

  return data
}

// Criar novo agendamento
export async function createAppointment(appointment: AppointmentInsert): Promise<Appointment> {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar agendamento:', error)
    throw new Error('Erro ao criar agendamento')
  }

  return data
}

// Atualizar agendamento
export async function updateAppointment(id: string, updates: AppointmentUpdate): Promise<Appointment> {
  const { data, error } = await supabase
    .from('appointments')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar agendamento:', error)
    throw new Error('Erro ao atualizar agendamento')
  }

  return data
}

// Deletar agendamento
export async function deleteAppointment(id: string): Promise<void> {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar agendamento:', error)
    throw new Error('Erro ao deletar agendamento')
  }
}

// Verificar disponibilidade de horário
export async function checkAvailability(
  userId: string, 
  date: string, 
  startTime: string, 
  duration: number,
  excludeAppointmentId?: string
): Promise<boolean> {
  const startDateTime = new Date(`${date}T${startTime}`)
  const endDateTime = new Date(startDateTime.getTime() + duration * 60000)

  let query = supabase
    .from('appointments')
    .select('id, data_hora, duracao_total')
    .eq('user_id', userId)
    .gte('data_hora', startDateTime.toISOString())
    .lt('data_hora', endDateTime.toISOString())

  if (excludeAppointmentId) {
    query = query.neq('id', excludeAppointmentId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Erro ao verificar disponibilidade:', error)
    throw new Error('Erro ao verificar disponibilidade')
  }

  return data.length === 0
}

// Buscar horários disponíveis
export async function getAvailableSlots(
  userId: string, 
  date: string, 
  duration: number
): Promise<string[]> {
  const startOfDay = new Date(date)
  startOfDay.setHours(8, 0, 0, 0) // 8:00 AM
  
  const endOfDay = new Date(date)
  endOfDay.setHours(18, 0, 0, 0) // 6:00 PM

  // Buscar agendamentos do dia
  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('data_hora, duracao_total')
    .eq('user_id', userId)
    .gte('data_hora', startOfDay.toISOString())
    .lte('data_hora', endOfDay.toISOString())
    .order('data_hora', { ascending: true })

  if (error) {
    console.error('Erro ao buscar agendamentos:', error)
    throw new Error('Erro ao buscar agendamentos')
  }

  // Gerar slots de 30 minutos
  const slots: string[] = []
  const currentTime = new Date(startOfDay)

  while (currentTime < endOfDay) {
    const slotStart = new Date(currentTime)
    const slotEnd = new Date(slotStart.getTime() + duration * 60000)

    // Verificar se o slot está disponível
    const isAvailable = !appointments?.some(appointment => {
      const appointmentStart = new Date(appointment.data_hora)
      const appointmentEnd = new Date(appointmentStart.getTime() + appointment.duracao_total * 60000)

      return (
        (slotStart >= appointmentStart && slotStart < appointmentEnd) ||
        (slotEnd > appointmentStart && slotEnd <= appointmentEnd) ||
        (slotStart <= appointmentStart && slotEnd >= appointmentEnd)
      )
    })

    if (isAvailable) {
      slots.push(slotStart.toTimeString().slice(0, 5))
    }

    currentTime.setMinutes(currentTime.getMinutes() + 30)
  }

  return slots
} 