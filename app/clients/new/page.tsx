import { getCurrentUserServer } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ClientForm from '@/components/clients/ClientForm'

export default async function NewClientPage() {
  const user = await getCurrentUserServer()
  
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/clients">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Novo Cliente</h1>
              <p className="text-gray-600 mt-2">
                Adicione um novo cliente ao seu sistema
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Cliente</CardTitle>
              <CardDescription>
                Preencha as informações básicas do cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ClientForm userId={user.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 