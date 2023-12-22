import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname } from 'expo-router/src/hooks'

import { NaturalPersonFormFields, naturalPersonFormSchema } from '@/libs/zod'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'

type FieldName = keyof NaturalPersonFormFields

export function useNaturalPesonForm(
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
  } = useForm<NaturalPersonFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(naturalPersonFormSchema),
  })
  const api = useApi()
  const pathname = usePathname()
  const isProfileScreen = pathname === '/profile'

  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )

  function checkNaturalPersonFormField(
    filedName: string
  ): filedName is FieldName {
    return !!personFormData.naturalPerson[filedName as FieldName]
  }

  function setNaturalPersonFormError(fieldName: string, message: string) {
    if (checkNaturalPersonFormField(fieldName)) {
      setError(fieldName, {
        message,
      })
    }
  }

  async function handleFormSubmit() {
    const customer = await api.getCustomerByEmail(
      personFormData.naturalPerson.email
    )

    if (customer && !isProfileScreen) {
      setError('email', {
        message: 'E-mail já cadastrado',
      })
      return
    }

    const hasCustomer = await api.checkCustomerDocument(
      personFormData.naturalPerson.cpf
    )

    if (hasCustomer && !isProfileScreen) {
      setError('cpf', {
        message: 'CPF já cadastrado',
      })
      return
    }
    onSubmit('natural', setNaturalPersonFormError)
  }

  function handleInputChange(
    changeHandler: (value: string) => void,
    value: string,
    fieldName: keyof NaturalPersonFormFields
  ) {
    changeHandler(value)

    setPersonFormData('natural', fieldName, value)
  }

  useEffect(() => {
    const { naturalPerson } = personFormData

    for (const fieldName of Object.keys(naturalPerson)) {
      const value = naturalPerson[fieldName as keyof NaturalPersonFormFields]
      if (value) setValue(fieldName as FieldName, value)
    }
  }, [personFormData])

  return {
    control,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
