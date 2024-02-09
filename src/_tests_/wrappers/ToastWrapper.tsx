import { ReactNode } from 'react'
import { View } from 'react-native'

import { TamaguiProvider } from '@/providers/components/TamaguiProvider'
import { ToastProvider } from '@/providers/components/ToastProvider'

const Truck = () => <View />

jest.mock('phosphor-react-native', () => ({
  Truck: () => {
    return <Truck />
  },
}))

type ToastWrapper = {
  children: ReactNode
}

export function ToastWrapper({ children }: ToastWrapper) {
  return (
    <TamaguiProvider>
      <ToastProvider>{children}</ToastProvider>
    </TamaguiProvider>
  )
}
