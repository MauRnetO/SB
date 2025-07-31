import { getCurrentUserServer } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Plus } from 'lucide-react'
import ProductForm from '@/components/products/ProductForm'

export default async function NewProductPage() {
  // Verificação de autenticação (segurança)
  const user = await getCurrentUserServer()
  
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs e navegação */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <a href="/products" className="hover:text-gray-900">Produtos</a>
            <span>/</span>
            <span className="text-gray-900">Novo Produto</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Package className="h-8 w-8 mr-3 text-blue-600" />
                Novo Produto
              </h1>
              <p className="text-gray-600 mt-2">
                Cadastre um novo produto no seu inventário
              </p>
            </div>
          </div>
        </div>

        {/* Formulário principal */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Informações do Produto
            </CardTitle>
            <CardDescription>
              Preencha os dados do produto para adicioná-lo ao seu inventário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductForm userId={user.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 