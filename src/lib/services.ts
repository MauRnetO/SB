import { supabase } from './supabase'
import { Database } from './supabase'

export type Service = Database['public']['Tables']['services']['Row']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']
export type ServiceUpdate = Database['public']['Tables']['services']['Update']

// Buscar todos os serviços do usuário
export async function getServices(userId: string): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('user_id', userId)
    .eq('ativo', true)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar serviços:', error)
    throw new Error('Erro ao buscar serviços')
  }

  return data || []
}

// Buscar serviço específico
export async function getService(id: string, userId: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Erro ao buscar serviço:', error)
    throw new Error('Erro ao buscar serviço')
  }

  return data
}

// Criar novo serviço
export async function createService(service: ServiceInsert): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .insert(service)
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar serviço:', error)
    throw new Error('Erro ao criar serviço')
  }

  return data
}

// Atualizar serviço
export async function updateService(id: string, updates: ServiceUpdate): Promise<Service> {
  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar serviço:', error)
    throw new Error('Erro ao atualizar serviço')
  }

  return data
}

// Deletar serviço (soft delete)
export async function deleteService(id: string): Promise<void> {
  const { error } = await supabase
    .from('services')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar serviço:', error)
    throw new Error('Erro ao deletar serviço')
  }
}

// Buscar serviços por categoria
export async function getServicesByCategory(userId: string, category: string): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('user_id', userId)
    .eq('categoria', category)
    .eq('ativo', true)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar serviços por categoria:', error)
    throw new Error('Erro ao buscar serviços por categoria')
  }

  return data || []
}

// Buscar categorias únicas
export async function getServiceCategories(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('services')
    .select('categoria')
    .eq('user_id', userId)
    .eq('ativo', true)
    .not('categoria', 'is', null)

  if (error) {
    console.error('Erro ao buscar categorias:', error)
    throw new Error('Erro ao buscar categorias')
  }

  const categories = [...new Set(data?.map(item => item.categoria) || [])]
  return categories.sort()
} 