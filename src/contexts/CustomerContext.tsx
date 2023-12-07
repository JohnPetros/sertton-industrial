import { createContext, ReactNode, useContext } from 'react'
import { useQuery } from 'react-query'

import { Customer as CustomerData } from '@/@types/customer'
import { useApi } from '@/services/api'
import { useStorage } from '@/services/storage'

type Customer =
  | (CustomerData & { selectedAddressZipcode: string | null | undefined })
  | null

type CustomerContextValue = {
  customer: Customer
  setSelectedAddressZipcode: (zipcode: string) => void
}

interface CustomerProviderProps {
  children: ReactNode
}

export const CustomerContext = createContext({} as CustomerContextValue)

export function CustomerProvider({ children }: CustomerProviderProps) {
  const storage = useStorage()

  async function getCustomer() {
    // const email = await storage.getCustomerEmail()
    // if (!email) return

    const customer = await api.getCustomerByEmail('joaopedro.nc@outlook.com')

    if (customer) {
      const selectedAddressZipcode =
        await storage.getCustomerSelectedAddressZipcode()

      return {
        ...customer,
        selectedAddressZipcode,
      }
    }
  }

  const api = useApi()

  const { data, error, isLoading, refetch } = useQuery('customer', () =>
    getCustomer()
  )

  async function setSelectedAddressZipcode(zipcode: string) {
    await storage.setCustomerSelectedAddressZipcode(zipcode)
  }

  return (
    <CustomerContext.Provider
      value={{
        customer: data ?? null,
        setSelectedAddressZipcode,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomerContext = () => {
  const context = useContext(CustomerContext)

  if (!context) {
    throw new Error('useCustomerContext must be used inside AuthProvider')
  }

  return context
}
