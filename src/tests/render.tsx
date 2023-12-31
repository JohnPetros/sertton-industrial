import { ReactNode } from 'react'
import { render as renderComponent } from '@testing-library/react-native'

import { QueryClientProvider } from '@/providers/QueryClientProvider'
import { TamaguiProvider } from '@/providers/TamaguiProvider'

export function render(component: ReactNode) {
  return renderComponent(
    <TamaguiProvider>
      <QueryClientProvider>{component}</QueryClientProvider>
    </TamaguiProvider>
  )
}
