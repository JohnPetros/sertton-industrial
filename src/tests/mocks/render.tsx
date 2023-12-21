import { ReactNode } from 'react'
import { render as renderComponent } from '@testing-library/react-native'

import { TamaguiProvider } from '@/providers/TamaguiProvider'

export function render(component: ReactNode) {
  renderComponent(<TamaguiProvider>{component}</TamaguiProvider>)
}
