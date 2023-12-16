import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CreditCard } from '@/@types/creditCard'
import { CreditCardFormFields, creditCardFormSchema } from '@/libs/zod'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function useCreditCardForm() {
  const {
    control,
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<CreditCardFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(creditCardFormSchema),
  })

  const api = useApi()
  const creditCard = useCheckoutStore((store) => store.state.creditCard)
  const setCreditCard = useCheckoutStore((store) => store.actions.setCreditCard)

  function handleInputChange(fieldName: keyof CreditCard, value: string) {
    setCreditCard(fieldName, value)
  }

  function handleApiError(error: string) {
    if (error.includes('holder_name')) {
      setError('name', {
        message: 'Nome inválido',
      })
    }
    if (error.includes('card.number')) {
      setError('number', {
        message: 'Número de cartão inválido',
      })
    }
    if (error.includes('card.cvv')) {
      setError('securityCode', {
        message: 'Código de segurança inválido',
      })
    }
    if (error.includes('card.exp_month') || error.includes('card.exp_year')) {
      setError('expirationDate', {
        message: 'Validade cartão inválida',
      })
    }
  }

  async function handleFormSubmit({
    cpf,
    expirationDate,
    name,
    number,
    securityCode,
  }: CreditCardFormFields) {
    try {
      const creditCardToken = await api.tokenizeCreditCard({
        cpf,
        expirationDate,
        name,
        number,
        securityCode,
      })
      console.log({ creditCardToken })
    } catch (error) {
      const responseError = api.handleError(error)
      handleApiError(JSON.stringify(responseError))
    }
  }

  useEffect(() => {
    setValue('number', creditCard.number)
    setValue('expirationDate', creditCard.expirationDate)
    setValue('securityCode', creditCard.securityCode)
    setValue('name', creditCard.name)
    setValue('cpf', creditCard.cpf)
  }, [])

  return {
    control: control,
    errors: errors,
    handleInputChange,
    handleSubmit: handleSubmit(handleFormSubmit),
  }
}
