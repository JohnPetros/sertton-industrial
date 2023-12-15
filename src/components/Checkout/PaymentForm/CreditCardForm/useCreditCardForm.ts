import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CreditCardFormFields, creditCardFormSchema } from '@/libs/zod'

export function useCreditCardForm() {
  const formFields = useForm<CreditCardFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(creditCardFormSchema),
  })

  function handleFormSubmit(data: CreditCardFormFields) {}

  return {
    formFields,
    control: formFields.control,
    errors: formFields.formState.errors,
    handleSubmit: formFields.handleSubmit(handleFormSubmit),
  }
}
