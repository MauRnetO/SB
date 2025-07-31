'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface ClientErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ClientErrorBoundaryProps {
  children: React.ReactNode
}

export class ClientErrorBoundary extends React.Component<ClientErrorBoundaryProps, ClientErrorBoundaryState> {
  constructor(props: ClientErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ClientErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ClientErrorBoundary capturou um erro:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full mx-auto p-6">
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Algo deu errado</h2>
                  <p className="text-sm">
                    Ocorreu um erro inesperado. Tente recarregar a página ou entre em contato com o suporte.
                  </p>
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <details className="text-xs">
                      <summary className="cursor-pointer font-medium">Detalhes do erro</summary>
                      <pre className="mt-2 p-2 bg-red-100 rounded text-red-800 overflow-auto">
                        {this.state.error.message}
                      </pre>
                    </details>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={this.resetError} size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Tentar Novamente
                    </Button>
                    <Button 
                      onClick={() => window.location.reload()} 
                      variant="outline" 
                      size="sm"
                    >
                      Recarregar Página
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 