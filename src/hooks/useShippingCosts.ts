import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

import { useApi } from '@/services/api'
import { CalculateShippingCostsRequest } from '@/services/api/interfaces/ILogisticsService'

export function useShippingCosts(
  { zipcode, quantities, total, skusIds }: CalculateShippingCostsRequest,
  shouldCalculate = false
) {
  const api = useApi()

  const { data, error } = useQuery(
    'shipment-costs',
    () =>
      api.calculateShippingCosts({
        zipcode,
        quantities,
        total,
        skusIds,
      }),
    {
      enabled: shouldCalculate,
    }
  )

  if (error) {
    const _error = error as AxiosError
    console.warn(_error.response)
  }

  return {
    shippingCosts: data,
    error,
  }
}
