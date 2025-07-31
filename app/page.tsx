import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          SupportingBases Ultimate
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Sistema completo de agendamento e gestão de serviços
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Proprietário</h3>
            <p className="text-gray-600 mb-4">Gerencie seu negócio</p>
            <Link
              href="/auth/login"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full"
            >
              Login
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Funcionário</h3>
            <p className="text-gray-600 mb-4">Acesse como equipe</p>
            <Link
              href="/auth/employee/login"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors w-full"
            >
              Login
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Cliente</h3>
            <p className="text-gray-600 mb-4">Agende seus serviços</p>
            <Link
              href="/auth/client/login"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors w-full"
            >
              Login
            </Link>
          </div>
        </div>
        
        <div className="space-y-2">
          <Link
            href="/auth/register"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Criar Conta de Proprietário
          </Link>
        </div>
      </div>
    </div>
  )
} 