import { ReactNode } from 'react'

import { ReactQueryProvider } from '@/providers/components/ReactQueryProvider'

type CacheWrapper = {
  children: ReactNode
}

export function CacheWrapper({ children }: CacheWrapper) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
