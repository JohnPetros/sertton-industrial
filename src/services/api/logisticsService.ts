import type { Api } from '@/@types/api'
import type { ShippingCosts } from '@/@types/shippingCosts'
import { Endpoints } from '@/services/api/endpoints'
import {
  CalculateShippingCostsRequest,
  ILogisticsService,
} from '@/services/api/interfaces/ILogisticsService'
import { Resources } from '@/services/api/resources'

export function logisticsService(api: Api): ILogisticsService {
  return {
    async calculateShippingCosts({
      zipcode,
      quantities,
      skus_ids,
      total,
    }: CalculateShippingCostsRequest) {
      const response = await api.post<
        ShippingCosts,
        CalculateShippingCostsRequest
      >(`/${Resources.LOGISTICS}/${Endpoints.SHIPPING_COST}`, {
        zipcode,
        quantities,
        skus_ids,
        total,
      })

      const { data } = response.data
      return data
    },
  }
}
