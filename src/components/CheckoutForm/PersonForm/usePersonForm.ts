import { useEffect } from 'react'

import { useCustomerContext } from '@/contexts/CustomerContext'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function usePersonForm(onSuccess: () => void) {
  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )
  const api = useApi()

  const { customer, fetchCustomerByEmail } = useCustomerContext()

  async function handleSubmit(personType: 'legal' | 'natural') {
    try {
      if (personType === 'natural') {
        const { naturalPerson } = personFormData
        await api.createCustomer({
          type: 'f',
          active: true,
          name: naturalPerson.name,
          email: naturalPerson.email,
          cpf: naturalPerson.cpf,
          homephone: naturalPerson.phone,
        })
      } else if (personType === 'legal') {
        const { legalPerson } = personFormData

        await api.createCustomer({
          type: 'j',
          active: true,
          razao_social: legalPerson.razaoSocial,
          cnpj: legalPerson.cnpj,
          email: legalPerson.email,
          homephone: legalPerson.phone,
        })
      }

      onSuccess()
      await fetchCustomerByEmail(
        personFormData[
          personType === 'natural' ? 'naturalPerson' : 'legalPerson'
        ].email
      )
    } catch (error) {
      console.error({ error })
      api.handleError(error)
    }
  }

  useEffect(() => {
    if (!customer) return

    if (customer?.type === 'f') {
      setPersonFormData('natural', 'email', customer.email)
      setPersonFormData('natural', 'name', customer.name ?? '')
      setPersonFormData('natural', 'cpf', customer.cpf ?? '')
      setPersonFormData('natural', 'phone', customer.phone?.full_number ?? '')
    } else if (customer?.type === 'j') {
      setPersonFormData('legal', 'email', customer.email)
      setPersonFormData('natural', 'name', customer.name ?? '')
      setPersonFormData('legal', 'cnpj', customer.cnpj ?? '')
      setPersonFormData('legal', 'phone', customer.phone?.full_number ?? '')
    }
  }, [customer])

  return {
    handleSubmit,
  }
}
