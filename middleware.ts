import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log('Middleware: Processando requisição para:', req.nextUrl.pathname)
  
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return req.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value))
            response = NextResponse.next({
              request: {
                headers: req.headers,
              },
            })
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
          },
        },
      }
    )

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession()

    console.log('Middleware: Sessão encontrada:', !!session)
    console.log('Middleware: Pathname:', req.nextUrl.pathname)

    // Rotas públicas que não precisam de autenticação
    const publicRoutes = ['/', '/auth/login', '/auth/register', '/auth/client/login', '/auth/employee/login']
    const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname === route)

    // If no session and trying to access protected routes, redirect to login
    if (!session && !isPublicRoute && req.nextUrl.pathname.startsWith('/')) {
      console.log('Middleware: Redirecionando para login (sem sessão)')
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // If session exists and trying to access auth pages, redirect to dashboard
    if (session && (req.nextUrl.pathname.startsWith('/auth/login') || req.nextUrl.pathname.startsWith('/auth/register'))) {
      console.log('Middleware: Redirecionando para dashboard (com sessão)')
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    console.log('Middleware: Continuando requisição normalmente')
    return response
  } catch (error) {
    console.error('Middleware: Erro ao processar requisição:', error)
    // Em caso de erro, permitir a requisição continuar
    return response
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/:path*',
    '/plans',
    '/clients/:path*',
    '/services/:path*',
    '/appointments/:path*',
    '/products/:path*',
  ],
} 