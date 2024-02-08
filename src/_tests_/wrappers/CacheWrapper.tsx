import { ReactNode } from 'react'

import { QueryClientProvider } from '@/providers/components/QueryClientProvider'

type CacheWrapper = {
  children: ReactNode
}

export function CacheWrapper({ children }: CacheWrapper) {
  return <QueryClientProvider>{children}</QueryClientProvider>
}
