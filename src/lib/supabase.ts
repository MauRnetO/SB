import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          nome_completo: string
          plano: string
          ativo: boolean
          criado_em: string
        }
        Insert: {
          id?: string
          email: string
          nome_completo: string
          plano?: string
          ativo?: boolean
          criado_em?: string
        }
        Update: {
          id?: string
          email?: string
          nome_completo?: string
          plano?: string
          ativo?: boolean
          criado_em?: string
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string
          nome: string
          email: string | null
          telefone: string | null
          avatar_url: string | null
          criado_em: string
        }
        Insert: {
          id?: string
          user_id: string
          nome: string
          email?: string | null
          telefone?: string | null
          avatar_url?: string | null
          criado_em?: string
        }
        Update: {
          id?: string
          user_id?: string
          nome?: string
          email?: string | null
          telefone?: string | null
          avatar_url?: string | null
          criado_em?: string
        }
      }
      services: {
        Row: {
          id: string
          user_id: string
          nome: string
          descricao: string | null
          valor: number
          duracao_minutos: number
          categoria: string
          imagem_url: string | null
          ativo: boolean
          criado_em: string
        }
        Insert: {
          id?: string
          user_id: string
          nome: string
          descricao?: string | null
          valor: number
          duracao_minutos: number
          categoria: string
          imagem_url?: string | null
          ativo?: boolean
          criado_em?: string
        }
        Update: {
          id?: string
          user_id?: string
          nome?: string
          descricao?: string | null
          valor?: number
          duracao_minutos?: number
          categoria?: string
          imagem_url?: string | null
          ativo?: boolean
          criado_em?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          cliente_id: string
          servicos_ids: string[]
          data_hora: string
          duracao_total: number
          status: string
          criado_em: string
        }
        Insert: {
          id?: string
          user_id: string
          cliente_id: string
          servicos_ids: string[]
          data_hora: string
          duracao_total: number
          status?: string
          criado_em?: string
        }
        Update: {
          id?: string
          user_id?: string
          cliente_id?: string
          servicos_ids?: string[]
          data_hora?: string
          duracao_total?: number
          status?: string
          criado_em?: string
        }
      }
      products: {
        Row: {
          id: string
          user_id: string
          nome: string
          codigo_estoque: string
          codigo_original: string | null
          valor_compra: number
          valor_venda: number
          quantidade: number
          unidade: string
          locacao: string | null
          ativo: boolean
          qtd_minima_alerta: number
          criado_em: string
        }
        Insert: {
          id?: string
          user_id: string
          nome: string
          codigo_estoque: string
          codigo_original?: string | null
          valor_compra: number
          valor_venda: number
          quantidade: number
          unidade: string
          locacao?: string | null
          ativo?: boolean
          qtd_minima_alerta: number
          criado_em?: string
        }
        Update: {
          id?: string
          user_id?: string
          nome?: string
          codigo_estoque?: string
          codigo_original?: string | null
          valor_compra?: number
          valor_venda?: number
          quantidade?: number
          unidade?: string
          locacao?: string | null
          ativo?: boolean
          qtd_minima_alerta?: number
          criado_em?: string
        }
      }
    }
  }
} 