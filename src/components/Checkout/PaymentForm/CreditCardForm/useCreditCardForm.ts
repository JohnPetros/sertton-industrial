import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { CreditCard } from '@/@types/creditCard'
import { PaymentMethod } from '@/@types/paymentMethod'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCart } from '@/hooks/useCart'
import { CreditCardFormFields, creditCardFormSchema } from '@/libs/zod'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function useCreditCardForm(
  onPay: (paymentMethod: PaymentMethod, cardToken: string) => Promise<void>
) {
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
  const address = useCheckoutStore((store) => store.state.address)
  const setCreditCard = useCheckoutStore((store) => store.actions.setCreditCard)

  const { customer } = useCustomerContext()
  const { getSelectedSkus } = useCart()

  function handleInputChange(fieldName: keyof CreditCard, value: string) {
    setCreditCard(fieldName, value)
  }

  function handleApiError(error: string) {
    if (error.includes('request.card.holder_name')) {
      setError('name', {
        message: 'Nome inválido',
      })
    }
    if (error.includes('request.card.number')) {
      setError('number', {
        message: 'Número de cartão inválido',
      })
    }
    if (error.includes('request.card.cvv')) {
      setError('securityCode', {
        message: 'Código de segurança inválido',
      })
    }
    if (
      error.includes('request.card.exp_month') ||
      error.includes('request.card.exp_year')
    ) {
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
      const creditCardToken = await api.tokenizeCard({
        cpf,
        expirationDate,
        name,
        number,
        securityCode,
      })

      if (!creditCardToken) return

      console.log({ creditCardToken })

      onPay('credit-card', creditCardToken)
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
