import { createContext, ReactNode, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'

import { Customer as CustomerData } from '@/@types/customer'
import { useApi } from '@/services/api'
import { useStorage } from '@/services/storage'

type Customer =
  | (CustomerData & { selectedAddressZipcode: string | null | undefined })
  | null

type CustomerContextValue = {
  customer: Customer
  fetchCustomerByEmail: (email: string) => void
  checkCustomerEmail: () => Promise<boolean>
  setSelectedAddressZipcode: (zipcode: string) => void
}

interface CustomerProviderProps {
  children: ReactNode
}

export const CustomerContext = createContext({} as CustomerContextValue)

export function CustomerProvider({ children }: CustomerProviderProps) {
  const storage = useStorage()

  async function getCustomerByEmail(email: string) {
    const customer = await api.getCustomerByEmail(email)

    if (customer) {
      await storage.setCustomerEmail(email)
      const selectedAddressZipcode =
        await storage.getCustomerSelectedAddressZipcode()

      return {
        ...customer,
        selectedAddressZipcode: selectedAddressZipcode ?? null,
      }
    }
  }

  async function fetchCustomer() {
    const email = await storage.getCustomerEmail()
    if (!email) return

    return getCustomerByEmail(email)
  }

  const api = useApi()

  const { data, refetch } = useQuery('customer', () => fetchCustomer())

  const customerEmailMutation = useMutation(
    (email: string) => getCustomerByEmail(email),
    {
      onSuccess: () => refetch(),
      onError: (error) => {
        api.handleError(error)
      },
    }
  )

  const customerZipcodeMutation = useMutation(
    (zipcode: string) => storage.setCustomerSelectedAddressZipcode(zipcode),
    {
      onSuccess: () => refetch(),
    }
  )

  async function fetchCustomerByEmail(email: string) {
    customerEmailMutation.mutate(email)
  }

  async function checkCustomerEmail() {
    const customerEmail = await storage.getCustomerEmail()

    return !!customerEmail
  }

  async function setSelectedAddressZipcode(zipcode: string) {
    customerZipcodeMutation.mutate(zipcode)
  }

  return (
    <CustomerContext.Provider
      value={{
        customer: data ?? null,
        fetchCustomerByEmail,
        checkCustomerEmail,
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
