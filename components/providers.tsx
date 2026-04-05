'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ChatPanelProvider } from '@/components/chat-sidebar/panel-context'
import { ChatSidebar } from '@/components/chat-sidebar/chat-sidebar'
import { ChatProvider } from '@/components/chat/chat-context'

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
      <ChatPanelProvider>
        <ChatProvider>
          {children}
          <ChatSidebar />
        </ChatProvider>
      </ChatPanelProvider>
    </QueryClientProvider>
  )
}
