'use client'

import { UserContextProvider } from '@/contexts/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { useState } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider>
      <UserContextProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </UserContextProvider>
    </SessionProvider>
  )
}
