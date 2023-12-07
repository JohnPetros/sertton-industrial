import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LegalPersonFormFields, legalPersonFormSchema } from '@/libs/zod'
import { useCheckoutStore } from '@/stores/checkoutStore'

type FieldName = keyof LegalPersonFormFields

export function useLegalPesonForm(
  onSubmit: (personType: 'natural' | 'legal') => void
) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LegalPersonFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(legalPersonFormSchema),
  })

  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )

  function handleFormSubmit() {
    onSubmit('legal')
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
