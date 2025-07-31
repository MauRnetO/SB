import { getCurrentUserServer } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import AppointmentForm from '@/components/appointments/AppointmentForm'

export default async function NewAppointmentPage() {
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
              <Link href="/appointments">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Novo Agendamento</h1>
              <p className="text-gray-600 mt-2">
                Crie um novo agendamento para seu cliente
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Agendamento</CardTitle>
              <CardDescription>
                Selecione o cliente, serviços e horário
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AppointmentForm userId={user.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 