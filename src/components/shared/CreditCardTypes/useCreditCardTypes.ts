import { useQuery } from 'react-query'

import { PaymentConfig } from '@/@types/paymentMethod'
import { useApi } from '@/services/api'

export function parsePaymentConfigsToCreditCardTypes(
  paymentConfigs: PaymentConfig[]
) {
  return paymentConfigs
    .filter(
      (paymentConfig) =>
        paymentConfig.is_credit_card && paymentConfig.active_config
    )
    .map(({ icon_url, alias }) => ({
      name: alias,
      icon: icon_url,
    }))
}

export function useCreditCardTypes() {
  const api = useApi()

  async function getCreditCardTypes() {
    try {
      const paymentConfigs = await api.getPaymentConfigs()

      return parsePaymentConfigsToCreditCardTypes(paymentConfigs)
    } catch (error) {
      api.handleError(error)
    }
  }

  const { data, isLoading } = useQuery('credit-card-types', getCreditCardTypes)

  return {
    creditCardTypes: data,
    isLoading,
  }
}
