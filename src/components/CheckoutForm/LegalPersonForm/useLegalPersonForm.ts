import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'expo-router'

import { LegalPersonFormFields, legalPersonFormSchema } from '@/libs/zod'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'

type FieldName = keyof LegalPersonFormFields

export function useLegalPesonForm(
  onSubmit: (
    personType: 'natural' | 'legal',
    setFormError: (fieldName: string, message: string) => void
  ) => void
) {
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LegalPersonFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(legalPersonFormSchema),
  })
  const api = useApi()
  const pathname = usePathname()

  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )

  function checkNaturalPersonFormField(
    filedName: string
  ): filedName is FieldName {
    return !!personFormData.legalPerson[filedName as FieldName]
  }

  function setLegalPersonFormError(fieldName: string, message: string) {
    if (checkNaturalPersonFormField(fieldName)) {
      setError(fieldName, {
        message,
      })
    }
  }

  async function handleFormSubmit() {
    if (pathname === '/profile') {
      onSubmit('legal', setLegalPersonFormError)
    }

    const customer = await api.getCustomerByEmail(
      personFormData.naturalPerson.email
    )

    if (customer) {
      setError('email', {
        message: 'E-mail já cadastrado',
      })
      return
    }

    const hasCustomer = await api.checkCustomerDocument(
      personFormData.legalPerson.cnpj
    )

    if (hasCustomer) {
      setError('cnpj', {
        message: 'CNPJ já cadastrado',
      })
      return
    }
    onSubmit('legal', setLegalPersonFormError)
  }

  function handleInputChange(
    changeHandler: (value: string) => void,
    value: string,
    fieldName: keyof LegalPersonFormFields
  ) {
    changeHandler(value)

    setPersonFormData('legal', fieldName, value)
  }

  useEffect(() => {
    const { legalPerson } = personFormData

    for (const fieldName of Object.keys(legalPerson)) {
      const value = legalPerson[fieldName as keyof LegalPersonFormFields]
      if (value) setValue(fieldName as FieldName, value)
    }
  }, [])

  return {
    control,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
