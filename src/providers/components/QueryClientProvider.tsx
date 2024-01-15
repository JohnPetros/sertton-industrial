import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider as Provider } from 'react-query'

const queryClient = new QueryClient()

interface ToastProviderProps {
  children: ReactNode
}

export function QueryClientProvider({ children }: ToastProviderProps) {
  return <Provider client={queryClient}>{children}</Provider>
}
