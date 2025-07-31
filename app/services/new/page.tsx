import { getCurrentUserServer } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ServiceForm from '@/components/services/ServiceForm'

export default async function NewServicePage() {
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
              <Link href="/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Novo Serviço</h1>
              <p className="text-gray-600 mt-2">
                Adicione um novo serviço ao seu catálogo
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Serviço</CardTitle>
              <CardDescription>
                Preencha as informações do seu serviço
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceForm userId={user.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 