'use client'

import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import { getCurrentUser, AuthUser } from './auth'

// Hook para verificar se usuário está autenticado
export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obter usuário inicial
    getCurrentUser().then(user => {
      setUser(user)
      setLoading(false)
    })

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const authUser = await getCurrentUser()
          setUser(authUser)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return { user, loading }
} 