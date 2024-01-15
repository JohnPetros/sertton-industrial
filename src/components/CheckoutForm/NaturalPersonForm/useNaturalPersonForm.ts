import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useValidation } from '@/services/validation'
import { NaturalPersonForm } from '@/services/validation/types/NaturalPersonForm'
import { useCheckoutStore } from '@/stores/checkoutStore'

type FieldName = keyof NaturalPersonForm

export function useNaturalPesonForm(
  onSubmit: (
    personType: 'natural' | 'legal',
    setFormError: (fieldName: string, message: string) => void
  ) => void
) {
  const { resolveNaturalPersonForm } = useValidation()

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NaturalPersonForm>({
    mode: 'onBlur',
    resolver: resolveNaturalPersonForm(),
  })

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
    onSubmit('natural', setNaturalPersonFormError)
  }

  function handleInputChange(
    changeHandler: (value: string) => void,
    value: string,
    fieldName: keyof NaturalPersonForm
  ) {
    changeHandler(value)

    setPersonFormData('natural', fieldName, value)
  }

  useEffect(() => {
    const { naturalPerson } = personFormData

    for (const fieldName of Object.keys(naturalPerson)) {
      const value = naturalPerson[fieldName as keyof NaturalPersonForm]
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
