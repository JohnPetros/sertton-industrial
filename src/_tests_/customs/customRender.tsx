import { ReactNode } from 'react'
import { render as renderComponent } from '@testing-library/react-native'

import { ReactQueryProvider } from '@/providers/components/ReactQueryProvider'
import { TamaguiProvider } from '@/providers/components/TamaguiProvider'

function customRender(component: ReactNode) {
  return renderComponent(
    <ReactQueryProvider>
      <TamaguiProvider>{component}</TamaguiProvider>
    </ReactQueryProvider>
  )
}

export { customRender as render }
