import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useCreditCardTypes() {
  const api = useApi()

  async function getCreditCardTypes() {
    try {
      const paymentConfigs = await api.getPaymentConfigs()

      return paymentConfigs
        .filter(
          (paymentConfig) =>
            paymentConfig.is_credit_card && paymentConfig.active_config
        )
        .map(({ icon_url, alias }) => ({
          name: alias,
          icon: icon_url,
        }))
    } catch (error) {
      api.handleError(error)
    }
  }

  const { data } = useQuery('credit-card-types', getCreditCardTypes)

  return {
    creditCardTypes: data,
  }
}
