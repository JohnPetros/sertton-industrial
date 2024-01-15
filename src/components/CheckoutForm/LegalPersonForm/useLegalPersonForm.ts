import { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useValidation } from '@/services/validation'
import { LegalPersonForm } from '@/services/validation/types/LegalPersonForm'
import { useCheckoutStore } from '@/stores/checkoutStore'

type FieldName = keyof LegalPersonForm

export function useLegalPesonForm(
  onSubmit: (
    personType: 'natural' | 'legal',
    setFormError: (fieldName: string, message: string) => void
  ) => void
) {
  const { resolveLegalPersonForm } = useValidation()

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LegalPersonForm>({
    mode: 'onBlur',
    resolver: resolveLegalPersonForm(),
  })

  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )

  function checkNaturalPersonFormField(
    filedName: string
  ): filedName is FieldName {
    return !!personFormData.legalPerson[filedName as FieldName]
  }

  const setLegalPersonFormError = useCallback(
    (fieldName: string, message: string) => {
      if (checkNaturalPersonFormField(fieldName)) {
        setError(fieldName, {
          message,
        })
      }
    },
    []
  )

  async function handleFormSubmit() {
    onSubmit('legal', setLegalPersonFormError)
  }

  function handleInputChange(
    changeHandler: (value: string) => void,
    value: string,
    fieldName: keyof LegalPersonForm
  ) {
    changeHandler(value)

    setPersonFormData('legal', fieldName, value)
  }

  useEffect(() => {
    const { legalPerson } = personFormData

    for (const fieldName of Object.keys(legalPerson)) {
      const value = legalPerson[fieldName as keyof LegalPersonForm]
      if (value) setValue(fieldName as FieldName, value)
    }
  }, [])

  return {
    control,
    errors,
    isSubmitting,
    setLegalPersonFormError,
    handleInputChange,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
