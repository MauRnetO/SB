'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erro ao verificar sessão:', error)
          setStatus('error')
          setMessage('Erro ao verificar autenticação')
          return
        }

        if (data.session) {
          // Usuário está autenticado
          setStatus('success')
          setMessage('Email confirmado com sucesso!')
          
          // Redirecionar para dashboard após 2 segundos
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        } else {
          // Verificar se há token de acesso na URL
          const accessToken = searchParams.get('access_token')
          const refreshToken = searchParams.get('refresh_token')
          
          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken
            })

            if (sessionError) {
              console.error('Erro ao definir sessão:', sessionError)
              setStatus('error')
              setMessage('Erro ao confirmar email')
            } else {
              setStatus('success')
              setMessage('Email confirmado com sucesso!')
              
              setTimeout(() => {
                router.push('/dashboard')
              }, 2000)
            }
          } else {
            setStatus('error')
            setMessage('Link de confirmação inválido')
          }
        }
      } catch (error) {
        console.error('Erro no callback:', error)
        setStatus('error')
        setMessage('Erro inesperado')
      }
    }

    handleAuthCallback()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Confirmação de Email</CardTitle>
          <CardDescription>
            Processando confirmação...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {status === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
              <p>Verificando confirmação...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="h-8 w-8 mx-auto text-green-600" />
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <p className="text-sm text-gray-600">
                Redirecionando para o dashboard...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <XCircle className="h-8 w-8 mx-auto text-red-600" />
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <Button 
                onClick={() => router.push('/auth/login')}
                className="w-full"
              >
                Ir para Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Carregando...</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          </CardContent>
        </Card>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
} 