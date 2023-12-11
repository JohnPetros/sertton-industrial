import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CreditCardFormFields, creditCardFormSchema } from '@/libs/zod'

export function useCreditCardForm() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreditCardFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(creditCardFormSchema),
  })

  function handleFormSubmit(data: CreditCardFormFields) {
    console.log(data)
  }

  return {
    control,
    errors,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
