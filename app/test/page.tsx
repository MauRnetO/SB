export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">✅ PÁGINA DE TESTE</h1>
        <p className="text-xl text-green-600">Se você está vendo esta página, o redirecionamento funcionou!</p>
        <div className="mt-8">
          <a href="/dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Ir para Dashboard
          </a>
        </div>
      </div>
    </div>
  )
} 