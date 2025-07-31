import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export interface AuthUser {
  id: string
  email: string
  nome_completo: string
  plano: string
  ativo: boolean
}

// Função para obter usuário atual (Server Component)
export async function getCurrentUserServer(): Promise<AuthUser | null> {
  try {
    console.log('getCurrentUserServer: Verificando usuário atual...')
    
    const cookieStore = await cookies()
    console.log('getCurrentUserServer: Cookies obtidos:', cookieStore.getAll().length, 'cookies')
    
    const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll() {
            // Server components can't set cookies
          },
        },
      }
    )
    
    const { data: { user }, error } = await supabaseServer.auth.getUser()
    
    console.log('getCurrentUserServer: Usuário do Auth:', user?.id)
    console.log('getCurrentUserServer: Erro do Auth:', error)
    
    if (error || !user) {
      console.log('getCurrentUserServer: Nenhum usuário autenticado')
      return null
    }

    // Buscar dados adicionais do usuário na tabela users
    console.log('getCurrentUserServer: Buscando dados na tabela users...')
    const { data: userData, error: userError } = await supabaseServer
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    console.log('getCurrentUserServer: Dados da tabela users:', userData)
    console.log('getCurrentUserServer: Erro da tabela users:', userError)

    if (userError || !userData) {
      console.log('getCurrentUserServer: Usuário não encontrado na tabela users')
      return null
    }

    const authUser = {
      id: userData.id,
      email: userData.email,
      nome_completo: userData.nome_completo,
      plano: userData.plano,
      ativo: userData.ativo
    }
    
    console.log('getCurrentUserServer: Retornando usuário:', authUser)
    return authUser
  } catch (error) {
    console.error('getCurrentUserServer: Erro geral:', error)
    return null
  }
} 