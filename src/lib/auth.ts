import { supabase } from './supabase'

export interface AuthUser {
  id: string
  email: string
  nome_completo: string
  plano: string
  ativo: boolean
}

// Função para obter usuário atual (Client Component)
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    console.log('getCurrentUser: Verificando usuário atual...')
    const { data: { user }, error } = await supabase.auth.getUser()
    
    console.log('getCurrentUser: Usuário do Auth:', user?.id)
    
    if (error || !user) {
      console.log('getCurrentUser: Nenhum usuário autenticado')
      return null
    }

    // Buscar dados adicionais do usuário na tabela users
    console.log('getCurrentUser: Buscando dados na tabela users...')
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    console.log('getCurrentUser: Dados da tabela users:', userData)
    console.log('getCurrentUser: Erro da tabela users:', userError)

    if (userError || !userData) {
      console.log('getCurrentUser: Usuário não encontrado na tabela users')
      return null
    }

    const authUser = {
      id: userData.id,
      email: userData.email,
      nome_completo: userData.nome_completo,
      plano: userData.plano,
      ativo: userData.ativo
    }
    
    console.log('getCurrentUser: Retornando usuário:', authUser)
    return authUser
  } catch (error) {
    console.error('getCurrentUser: Erro geral:', error)
    return null
  }
}

// Função para fazer login
export async function signIn(email: string, password: string) {
  try {
    console.log('signIn: Iniciando login para:', email)
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log('signIn: Resposta do Supabase:', { data: !!data, error })

    if (error) {
      console.error('signIn: Erro do Supabase:', error)
      throw error
    }

    console.log('signIn: Login bem-sucedido, usuário:', data.user?.id)
    return { data, error: null }
  } catch (error) {
    console.error('signIn: Erro geral:', error)
    return { data: null, error }
  }
}

// Função para fazer registro
export async function signUp(email: string, password: string, nome_completo: string) {
  try {
    console.log('Iniciando registro para:', email)
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome_completo
        }
      }
    })

    if (error) {
      console.error('Erro no signUp do Supabase:', error)
      throw error
    }

    console.log('Usuário criado no Auth:', data.user?.id)

    // Criar registro na tabela users
    if (data.user) {
      const userData = {
        id: data.user.id,
        email: data.user.email!,
        nome_completo,
        plano: 'gratuito',
        ativo: true,
        criado_em: new Date().toISOString()
      }

      console.log('Tentando inserir na tabela users:', userData)

      const { error: userError } = await supabase
        .from('users')
        .insert(userData)

      if (userError) {
        console.error('Erro ao criar usuário na tabela:', userError)
        return { data: null, error: userError }
      }

      console.log('Usuário criado com sucesso na tabela')
    }

    return { data, error: null }
  } catch (error) {
    console.error('Erro geral no signUp:', error)
    return { data: null, error }
  }
}

// Função para fazer logout
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    return { error }
  }
}

// Função para recuperar senha
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
    })

    return { error }
  } catch (error) {
    return { error }
  }
}

 