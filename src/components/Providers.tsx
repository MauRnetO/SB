'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
        retry: (failureCount, error) => {
          const errorWithStatus = error as { status?: number }
          if (errorWithStatus?.status && errorWithStatus.status >= 400 && errorWithStatus.status < 500 && ![408, 429].includes(errorWithStatus.status)) {
            return false
          }
          return failureCount < 3
        },
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
      mutations: {
        retry: (failureCount, error) => {
          const errorWithStatus = error as { status?: number }
          if (errorWithStatus?.status && errorWithStatus.status >= 400 && errorWithStatus.status < 500 && ![408, 429].includes(errorWithStatus.status)) {
            return false
          }
          return failureCount < 2
        },
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
} 