import { getCurrentUserServer } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar, Package, Settings, Plus, TrendingUp, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  console.log('DashboardPage: Carregando página...')
  
  let user;
  try {
    user = await getCurrentUserServer()
    console.log('DashboardPage: Usuário obtido:', user)
    
    if (!user) {
      console.log('DashboardPage: Usuário não encontrado, redirecionando para login')
      redirect('/auth/login')
    }

    // Verificar se usuário tem plano ativo
    console.log('DashboardPage: Verificando plano:', user.plano, 'ativo:', user.ativo)
    console.log('DashboardPage: Tipo de ativo:', typeof user.ativo)
    
    if (user.plano === 'gratuito' && user.ativo === false) {
      console.log('DashboardPage: Usuário sem plano ativo, redirecionando para plans')
      redirect('/plans')
    }
    
    console.log('DashboardPage: Usuário autorizado, renderizando dashboard...')
  } catch (error) {
    console.error('DashboardPage: Erro ao carregar dashboard:', error)
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bem-vindo, {user.nome_completo}!
          </h1>
          <p className="text-gray-600 mt-2">
            Gerencie seus agendamentos, clientes e serviços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agendamentos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Agendamentos hoje
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Total de clientes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Serviços</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Serviços ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 0</div>
              <p className="text-xs text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>
                Acesse rapidamente as principais funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button asChild className="h-20 flex-col">
                  <Link href="/clients/new">
                    <Plus className="h-6 w-6 mb-2" />
                    Novo Cliente
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link href="/services/new">
                    <Package className="h-6 w-6 mb-2" />
                    Novo Serviço
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link href="/appointments/new">
                    <Calendar className="h-6 w-6 mb-2" />
                    Novo Agendamento
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-20 flex-col">
                  <Link href="/products/new">
                    <Package className="h-6 w-6 mb-2" />
                    Novo Produto
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
              <CardDescription>
                Configure seu sistema para começar a usar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div className="flex-1">
                    <Link href="/clients" className="text-blue-600 hover:underline font-medium">
                      Adicione seus primeiros clientes
                    </Link>
                    <p className="text-sm text-gray-600">Gerencie contatos e informações</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div className="flex-1">
                    <Link href="/services" className="text-green-600 hover:underline font-medium">
                      Crie seus serviços
                    </Link>
                    <p className="text-sm text-gray-600">Configure preços e durações</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div className="flex-1">
                    <Link href="/appointments" className="text-purple-600 hover:underline font-medium">
                      Faça seu primeiro agendamento
                    </Link>
                    <p className="text-sm text-gray-600">Organize sua agenda</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Navegação Rápida</CardTitle>
              <CardDescription>
                Acesse todas as funcionalidades do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button asChild variant="outline" className="h-16 flex-col">
                  <Link href="/clients">
                    <Users className="h-5 w-5 mb-1" />
                    Clientes
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-16 flex-col">
                  <Link href="/services">
                    <Package className="h-5 w-5 mb-1" />
                    Serviços
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-16 flex-col">
                  <Link href="/appointments">
                    <Calendar className="h-5 w-5 mb-1" />
                    Agendamentos
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="h-16 flex-col">
                  <Link href="/products">
                    <Package className="h-5 w-5 mb-1" />
                    Produtos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 