import { useEffect, useRef } from 'react'

import type { AlertRef } from '@/components/shared/Alert/types/AlertRef'
import type { DialogRef } from '@/components/shared/Dialog/types/DialogRef'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useApi } from '@/services/api'
import { type PersonFormData, useCheckoutStore } from '@/stores/checkoutStore'

type SetFormError = (fieldName: string, message: string) => void

export function useProfile() {
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )
  const { customer, updateCustomer } = useCustomerContext()
  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const originalPersonData = useRef<PersonFormData | null>(null)
  const emailDialogRef = useRef<DialogRef | null>(null)
  const alertRef = useRef<AlertRef | null>(null)
  const api = useApi()

  async function handleFormSubmit(_: string, setFormError: SetFormError) {
    if (!originalPersonData.current || !customer) return

    if (customer.type === 'f') {
      const { naturalPerson } = personFormData
      const originalNaturalPersonData =
        originalPersonData.current?.naturalPerson

      const isDifferentEmail =
        originalNaturalPersonData.email !== naturalPerson.email

      if (isDifferentEmail) {
        const hasCustomer = await api.getCustomerByEmail(naturalPerson.email)
        if (hasCustomer) {
          setFormError('email', 'E-mail já utilizado por outro usuário')
          return
        }
      }

      const isDifferentDocument =
        originalNaturalPersonData.cpf !== naturalPerson.cpf

      if (isDifferentDocument) {
        const hasCustomer = await api.checkCustomerDocument(naturalPerson.cpf)
        if (hasCustomer) {
          setFormError('cpf', 'CPF já utilizado por outro usuário')
          return
        }
      }

      const naturalCustomer = {
        name: naturalPerson.name,
        email: naturalPerson.email,
        cpf: naturalPerson.cpf,
        homephone: naturalPerson.phone,
      }

      updateCustomer(naturalCustomer)
    } else if (customer?.type === 'j') {
      const { legalPerson } = personFormData
      const originalLegalPersonData = originalPersonData.current.legalPerson

      const isDifferentDocument =
        originalLegalPersonData.cnpj !== legalPerson.cnpj

      if (isDifferentDocument) {
        const hasCustomer = await api.checkCustomerDocument(legalPerson.cnpj)
        if (hasCustomer) {
          setFormError('cnpj', 'CNPJ já utilizado por outro usuário')
          return
        }
      }

      const legalCustomer = {
        razao_social: legalPerson.razaoSocial,
        cnpj: legalPerson.cnpj,
        email: legalPerson.email,
        homephone: legalPerson.phone,
      }

      updateCustomer(legalCustomer)
    }
  }

  useEffect(() => {
    if (!customer) {
      emailDialogRef.current?.open()
      return
    }

    if (customer.type === 'f') {
      const personData = {
        name: customer.name ?? '',
        email: customer.email ?? '',
        cpf: customer.cpf ?? '',
        phone: customer.phone?.full_number ?? '',
      }

      setPersonFormData('natural', 'email', personData.email)
      setPersonFormData('natural', 'name', personData.name)
      setPersonFormData('natural', 'cpf', personData.cpf)
      setPersonFormData('natural', 'phone', personData.phone)

      originalPersonData.current = {
        naturalPerson: personData,
        legalPerson: {
          email: '',
          phone: '',
          razaoSocial: '',
          cnpj: '',
        },
      }
    } else if (customer.type === 'j') {
      const personData = {
        razaoSocial: customer.razao_social ?? '',
        email: customer.email ?? '',
        cnpj: customer.cnpj ?? '',
        phone: customer.phone?.full_number ?? '',
      }

      setPersonFormData('legal', 'email', personData.email)
      setPersonFormData('legal', 'razaoSocial', personData.razaoSocial)
      setPersonFormData('legal', 'cnpj', personData.cnpj)
      setPersonFormData('legal', 'phone', personData.phone)

      originalPersonData.current = {
        naturalPerson: {
          name: '',
          email: '',
          cpf: '',
          phone: '',
        },
        legalPerson: personData,
      }
    }
  }, [customer])

  return {
    handleFormSubmit,
    customer,
    emailDialogRef,
    alertRef,
  }
}
