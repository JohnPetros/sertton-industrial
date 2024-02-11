import type { ReactNode } from 'react'
import { View } from 'react-native'

import { customerMock } from '../customerMock'

import { ProvidersProps } from './types/ProvidersMockProps'

import { CustomerContext } from '@/contexts/CustomerContext'
import { CacheProvider } from '@/providers/components/CacheProvider'
import { TamaguiProvider } from '@/providers/components/TamaguiProvider'
import { ToastProvider } from '@/providers/components/ToastProvider'

// phosphor-react-native test bug fix
const Truck = () => <View />

jest.mock('phosphor-react-native', () => ({
  Truck: () => {
    return <Truck />
  },
}))

// Cacha test bug fix
jest.useFakeTimers()

type ProvidersMockProps = {
  children: ReactNode
  providersProps?: ProvidersProps
}

export function ProvidersMock({
  children,
  providersProps,
}: ProvidersMockProps) {
  return (
    <CacheProvider>
      <TamaguiProvider>
        <ToastProvider>
          <CustomerContext.Provider
            value={{
              customer: customerMock,
              removeCustomer: jest.fn(),
              fetchCustomerByEmail: jest.fn(),
              setSelectedAddressZipcode: jest.fn(),
              updateCustomer: jest.fn(),
              ...providersProps?.customerContextProps,
            }}
          >
            {children}
          </CustomerContext.Provider>
        </ToastProvider>
      </TamaguiProvider>
    </CacheProvider>
  )
}
