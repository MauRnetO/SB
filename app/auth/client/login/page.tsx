import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, User } from 'lucide-react'
import { useState } from 'react'

export default function ClientLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <User className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Login de Cliente</CardTitle>
          <CardDescription>
            Acesse sua conta de cliente para agendar serviços
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Entrar como Cliente
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <a href="/auth/client/register" className="text-sm text-blue-600 hover:underline block">
              Criar conta de cliente
            </a>
            <a href="/auth/login" className="text-sm text-gray-600 hover:underline block">
              Login como Proprietário
            </a>
            <a href="/auth/employee/login" className="text-sm text-gray-600 hover:underline block">
              Login como Funcionário
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 