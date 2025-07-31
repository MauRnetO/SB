import { supabase } from './supabase'
import { Database } from './supabase'

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

// Buscar todos os produtos do usuário
export async function getProducts(userId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    .eq('ativo', true)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar produtos:', error)
    throw new Error('Erro ao buscar produtos')
  }

  return data || []
}

// Buscar produto específico
export async function getProduct(id: string, userId: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Erro ao buscar produto:', error)
    throw new Error('Erro ao buscar produto')
  }

  return data
}

// Criar novo produto
export async function createProduct(product: ProductInsert): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()

  if (error) {
    console.error('Erro ao criar produto:', error)
    throw new Error('Erro ao criar produto')
  }

  return data
}

// Atualizar produto
export async function updateProduct(id: string, updates: ProductUpdate): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar produto:', error)
    throw new Error('Erro ao atualizar produto')
  }

  return data
}

// Deletar produto (soft delete)
export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update({ ativo: false })
    .eq('id', id)

  if (error) {
    console.error('Erro ao deletar produto:', error)
    throw new Error('Erro ao deletar produto')
  }
}

// Buscar produtos com estoque baixo
export async function getLowStockProducts(userId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    .eq('ativo', true)
    .lte('quantidade', 'qtd_minima_alerta')
    .order('quantidade', { ascending: true })

  if (error) {
    console.error('Erro ao buscar produtos com estoque baixo:', error)
    throw new Error('Erro ao buscar produtos com estoque baixo')
  }

  return data || []
}

// Atualizar estoque
export async function updateStock(id: string, quantidade: number): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update({ quantidade })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Erro ao atualizar estoque:', error)
    throw new Error('Erro ao atualizar estoque')
  }

  return data
}

// Buscar produtos por categoria
export async function getProductsByCategory(userId: string, category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', userId)
    .eq('ativo', true)
    .ilike('nome', `%${category}%`)
    .order('nome', { ascending: true })

  if (error) {
    console.error('Erro ao buscar produtos por categoria:', error)
    throw new Error('Erro ao buscar produtos por categoria')
  }

  return data || []
} 