import { ReactNode } from 'react'
import { render as renderComponent } from '@testing-library/react-native'

import { QueryClientProvider } from '@/providers/components/QueryClientProvider'
import { TamaguiProvider } from '@/providers/components/TamaguiProvider'

function customRender(component: ReactNode) {
  return renderComponent(
    <TamaguiProvider>
      <QueryClientProvider>{component}</QueryClientProvider>
    </TamaguiProvider>
  )
}

export { customRender as render }
