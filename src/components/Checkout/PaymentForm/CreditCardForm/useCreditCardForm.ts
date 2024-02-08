import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { CreditCard } from '@/@types/creditCard'
import { PaymentMethod } from '@/@types/paymentMethod'
import { useApi } from '@/services/api'
import { useValidation } from '@/services/validation'
import { CreditCardForm } from '@/services/validation/types/CreditCardForm'
import { useCheckoutStore } from '@/stores/checkoutStore'

export const creditCardApiErrors = {
  name: 'Nome inválido',
  number: 'Número de cartão inválido',
  securityCode: 'Código de segurança inválido',
  expirationDate: 'Validade cartão inválida',
}

export function useCreditCardForm(
  onPay: (paymentMethod: PaymentMethod, cardToken: string) => Promise<void>
) {
  const validation = useValidation()

  const {
    control,
    setValue,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<CreditCardForm>({
    mode: 'onBlur',
    resolver: validation.resolveCreditCardform(),
  })

  const api = useApi()

  const creditCard = useCheckoutStore((store) => store.state.creditCard)
  const setCreditCard = useCheckoutStore((store) => store.actions.setCreditCard)

  function handleInputChange(fieldName: keyof CreditCard, value: string) {
    setCreditCard(fieldName, value)
  }

  function handleApiError(error: string) {
    if (error.includes('request.card.holder_name')) {
      setError('name', {
        message: creditCardApiErrors.name,
      })
    }
    if (error.includes('request.card.number')) {
      setError('number', {
        message: creditCardApiErrors.number,
      })
    }
    if (error.includes('request.card.cvv')) {
      setError('securityCode', {
        message: creditCardApiErrors.securityCode,
      })
    }
    if (
      error.includes('request.card.exp_month') ||
      error.includes('request.card.exp_year')
    ) {
      setError('expirationDate', {
        message: creditCardApiErrors.expirationDate,
      })
    }
  }

  async function handleFormSubmit({
    cpf,
    expirationDate,
    name,
    number,
    securityCode,
  }: CreditCardForm) {
    // try {
    //   const creditCardToken = await api.tokenizeCard({
    //     cpf,
    //     expirationDate,
    //     name,
    //     number,
    //     securityCode,
    //   })
    //   if (!creditCardToken) return
    //   onPay('credit-card', creditCardToken)
    // } catch (error) {
    //   const responseError = api.handleError(error)
    //   handleApiError(JSON.stringify(responseError))
    // }
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
    handleFormSubmit,
  }
}
