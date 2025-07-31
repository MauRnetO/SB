import { supabase } from './supabase'
import { Database } from './supabase'

export type Client = Database['public']['Tables']['clients']['Row']
export type ClientInsert = Database['public']['Tables']['clients']['Insert']
export type ClientUpdate = Database['public']['Tables']['clients']['Update']

// Buscar todos os clientes do usuário
export async function getClients(userId: string): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar clientes:', error)
    throw new Error('Erro ao buscar clientes')
  }

  return data || []
}

// Buscar cliente específico
export async function getClient(id: string, userId: string): Promise<Client | null> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Erro ao buscar cliente:', error)
    throw new Error('Erro ao buscar cliente')
  }

  return data
}

// Criar novo cliente
export async function createClient(client: ClientInsert): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .insert(client)
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar cliente:', error)
    throw new Error('Erro ao criar cliente')
  }

  return data
}

// Atualizar cliente
export async function updateClient(id: string, updates: ClientUpdate): Promise<Client> {
  const { data, error } = await supabase
    .from('clients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar cliente:', error)
    throw new Error('Erro ao atualizar cliente')
  }

  return data
}

// Deletar cliente
export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar cliente:', error)
    throw new Error('Erro ao deletar cliente')
  }
}

// Buscar clientes por nome (busca)
export async function searchClients(userId: string, searchTerm: string): Promise<Client[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .ilike('nome', `%${searchTerm}%`)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar clientes:', error)
    throw new Error('Erro ao buscar clientes')
  }

  return data || []
} 