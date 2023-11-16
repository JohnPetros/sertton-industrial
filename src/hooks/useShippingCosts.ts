import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

import { useApi } from '@/services/api'
import { Endpoints } from '@/services/api/endpoints'
import { CalculateShippingCostsRequest } from '@/services/api/interfaces/ILogisticsService'
import { Resources } from '@/services/api/resources'

export function useShippingCosts(
  { zipcode, quantities, total, skus_ids }: CalculateShippingCostsRequest,
  shouldCalculate = false
) {
  const api = useApi()

  const { data, error } = useQuery(
    [Endpoints.SHIPPING_COST],
    () =>
      api.calculateShippingCosts({
        zipcode,
        quantities,
        total,
        skus_ids,
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
