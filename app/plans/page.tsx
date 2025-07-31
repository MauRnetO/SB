import { getCurrentUserServer } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check, Star } from 'lucide-react'

export default async function PlansPage() {
  const user = await getCurrentUserServer()
  
  if (!user) {
    redirect('/auth/login')
  }

  const plans = [
    {
      id: 'gratuito',
      name: 'Gratuito',
      price: 'R$ 0',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        'Até 10 clientes',
        'Até 5 serviços',
        'Agendamentos básicos',
        'Relatórios simples'
      ],
      popular: false
    },
    {
      id: 'profissional',
      name: 'Profissional',
      price: 'R$ 49',
      period: '/mês',
      description: 'Para profissionais autônomos',
      features: [
        'Clientes ilimitados',
        'Serviços ilimitados',
        'Agendamentos avançados',
        'Relatórios completos',
        'Notificações automáticas',
        'App para clientes'
      ],
      popular: true
    },
    {
      id: 'empresa',
      name: 'Empresa',
      price: 'R$ 99',
      period: '/mês',
      description: 'Para equipes e empresas',
      features: [
        'Tudo do Profissional',
        'Múltiplos funcionários',
        'Gestão de equipe',
        'Relatórios avançados',
        'Integração com WhatsApp',
        'Suporte prioritário'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha seu Plano
          </h1>
          <p className="text-xl text-gray-600">
            Selecione o plano ideal para o seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? 'border-blue-500 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Mais Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {user.plano === plan.id ? 'Plano Atual' : 'Escolher Plano'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Precisa de um plano personalizado? 
            <a href="/contact" className="text-blue-600 hover:underline ml-1">
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 