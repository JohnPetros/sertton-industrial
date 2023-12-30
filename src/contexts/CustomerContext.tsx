import { createContext, ReactNode, useContext, useMemo } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Customer } from '@/@types/customer'
import { useToast } from '@/components/Toast/useToast'
import { useApi } from '@/services/api'
import { useStorage } from '@/services/storage'

type CustomerContextValue = {
  customer: Customer | null
  fetchCustomerByEmail: (email: string) => Promise<boolean>
  updateCustomer: (customer: Partial<Customer>) => void
  setSelectedAddressZipcode: (zipcode: string) => void
}

interface CustomerProviderProps {
  children: ReactNode
}

export const CustomerContext = createContext({} as CustomerContextValue)

export function CustomerProvider({ children }: CustomerProviderProps) {
  const storage = useStorage()
  const queryClient = useQueryClient()
  const toast = useToast()

  function updateCustomerQuery(updatedCustomerData: Partial<Customer>) {
    queryClient.setQueryData('customer', {
      ...customer,
      ...updatedCustomerData,
    })
  }

  async function getCustomerByEmail(email: string): Promise<Customer | null> {
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

    return null
  }

  async function fetchCustomer() {
    const email = await storage.getCustomerEmail()
    if (!email) return

    return getCustomerByEmail(email)
  }

  const api = useApi()

  const { data: customer, refetch } = useQuery('customer', () =>
    fetchCustomer()
  )

  async function setCustomerZipcode(zipcode: string) {
    await storage.setCustomerSelectedAddressZipcode(zipcode)

    return {
      selectedAddressZipcode: zipcode,
    }
  }

  async function mutateCustomerData(updatedCustomerData: Partial<Customer>) {
    if (!customer) return null

    try {
      api.updateCustomerById(customer.id, {
        ...customer,
        ...updatedCustomerData,
      })
      return updatedCustomerData
    } catch (error) {
      api.handleError(error)
      return null
    }
  }

  const customerEmailMutation = useMutation(
    (email: string) => getCustomerByEmail(email),
    {
      onSuccess: (customer: Customer | null) => {
        if (customer) {
          updateCustomerQuery(customer)
        }
      },
      onError: (error) => {
        api.handleError(error)
        toast.show('Erro ao atualizar e-mail :(', 'error')
      },
    }
  )

  const customerZipcodeMutation = useMutation(
    (zipcode: string) => setCustomerZipcode(zipcode),
    {
      onSuccess: () => refetch(),
      onError: (error) => {
        api.handleError(error)
        toast.show('Erro ao atualizar CEP de endereço :(', 'error')
      },
    }
  )

  const customerDataMutation = useMutation(
    (updatedCustomerData: Partial<Customer>) =>
      mutateCustomerData(updatedCustomerData),
    {
      onSuccess: (updatedCustomerData: Partial<Customer> | null) => {
        if (updatedCustomerData) {
          updateCustomerQuery(updatedCustomerData)
          toast.show('Cadastro atualizado com sucesso!')
        }
      },
      onError: (error) => {
        api.handleError(error)
        toast.show('Erro ao atualizar cadastro :(', 'error')
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

  function updateCustomer(updatedCustomer: Partial<Customer>) {
    customerDataMutation.mutate(updatedCustomer)
  }

  function setSelectedAddressZipcode(zipcode: string) {
    customerZipcodeMutation.mutate(zipcode)
  }

  const value = useMemo(
    () => ({
      customer: customer ?? null,
      fetchCustomerByEmail,
      updateCustomer,
      setSelectedAddressZipcode,
    }),
    [customer]
  )

  return (
    <CustomerContext.Provider value={value}>
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
