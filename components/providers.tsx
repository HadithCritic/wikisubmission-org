'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AskProvider } from '@/components/ask-sidebar/ask-context'
import { AskSidebar } from '@/components/ask-sidebar/ask-sidebar'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AskProvider>
        {children}
        <AskSidebar />
      </AskProvider>
    </QueryClientProvider>
  )
}
