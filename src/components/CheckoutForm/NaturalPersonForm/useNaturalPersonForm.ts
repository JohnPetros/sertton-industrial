import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { NaturalPersonFormFields, naturalPersonFormSchema } from '@/libs/zod'
import { useCheckoutStore } from '@/stores/checkoutStore'

type FieldName = keyof NaturalPersonFormFields

export function useNaturalPesonForm(
  onSubmit: (personType: 'natural' | 'legal') => void
) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NaturalPersonFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(naturalPersonFormSchema),
  })

  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )

  function handleFormSubmit() {
    onSubmit('natural')
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
  }, [])

  return {
    control,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
