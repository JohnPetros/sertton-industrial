import { createContext, ReactNode, useContext } from 'react'
import { useMutation, useQuery } from 'react-query'

import { Customer } from '@/@types/customer'
import { useApi } from '@/services/api'
import { useStorage } from '@/services/storage'

type CustomerContextValue = {
  customer: Customer | null
  fetchCustomerByEmail: (email: string) => Promise<boolean>
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

    if (!customer) {
      throw new Error('Customer not found')
    }

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
    }
  )

  async function setCustomerZipcode(zipcode: string) {
    await storage.setCustomerSelectedAddressZipcode(zipcode)

    return {
      customer: data,
      selectedAddressZipcode: zipcode,
    }
  }

  const customerZipcodeMutation = useMutation(
    (zipcode: string) => setCustomerZipcode(zipcode),
    {
      onSuccess: () => {
        refetch()
      },
      onError: (error) => {
        api.handleError(error)
      },
    }
  )

  async function fetchCustomerByEmail(email: string) {
    try {
      await customerEmailMutation.mutateAsync(email)
      return true
    } catch (error) {
      return false
    }
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
