import { useEffect } from 'react'

import { Customer } from '@/@types/customer'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { VALIDATION_ERRORS } from '@/utils/constants/validationErrors'

type SetFormError = (fieldName: string, message: string) => void

export function usePersonForm(onSuccess: () => void) {
  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )
  const api = useApi()

  const { customer, updateCustomer, fetchCustomerByEmail } =
    useCustomerContext()

  async function handleSubmit(
    personType: 'legal' | 'natural',
    setFormError: SetFormError
  ) {
    try {
      if (personType === 'natural') {
        const { naturalPerson } = personFormData

        if (!customer || customer.email !== naturalPerson.email) {
          const hasRepeatedEmail = Boolean(
            await api.getCustomerByEmail(naturalPerson.email)
          )

          if (hasRepeatedEmail) {
            setFormError('email', VALIDATION_ERRORS.email.inUse)
            return
          }
        }

        if (!customer || customer.cpf !== naturalPerson.cpf) {
          const hasRepeatedCpf = await api.checkCustomerDocument(
            naturalPerson.cpf
          )

          if (hasRepeatedCpf) {
            setFormError('cpf', VALIDATION_ERRORS.cpf.inUse)
            return
          }
        }

        const naturalPersonFormData: Omit<Customer, 'id' | 'addresses'> = {
          type: 'f',
          active: true,
          name: naturalPerson.name,
          email: naturalPerson.email,
          cpf: naturalPerson.cpf,
          homephone: naturalPerson.phone,
        }

        if (customer) {
          updateCustomer(naturalPersonFormData)
          onSuccess()
          return
        }

        await api.createCustomer(naturalPersonFormData)
      } else if (personType === 'legal') {
        const { legalPerson } = personFormData

        if (!customer || customer.email !== legalPerson.email) {
          const hasRepeatedEmail = Boolean(
            await api.getCustomerByEmail(personFormData.legalPerson.email)
          )
          if (hasRepeatedEmail) {
            setFormError('email', VALIDATION_ERRORS.email.inUse)
            return
          }
        }

        if (!customer || customer.cnpj !== legalPerson.cnpj) {
          const hasRepeatedCpf = Boolean(
            await api.checkCustomerDocument(legalPerson.cnpj)
          )
          if (hasRepeatedCpf) {
            setFormError('cnpj', VALIDATION_ERRORS.cnpj.inUse)
            return
          }
        }

        const legalPersonFormData: Omit<Customer, 'id' | 'addresses'> = {
          type: 'j',
          active: true,
          razao_social: legalPerson.razaoSocial,
          cnpj: legalPerson.cnpj,
          email: legalPerson.email,
          homephone: legalPerson.phone,
        }

        if (customer) {
          updateCustomer(legalPersonFormData)
          onSuccess()
          return
        }

        await api.createCustomer(legalPersonFormData)
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
      setPersonFormData('legal', 'razaoSocial', customer.razao_social ?? '')
      setPersonFormData('legal', 'cnpj', customer.cnpj ?? '')
      setPersonFormData('legal', 'phone', customer.phone?.full_number ?? '')
    }
  }, [customer])

  return {
    handleSubmit,
  }
}
