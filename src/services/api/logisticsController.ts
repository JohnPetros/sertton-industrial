import type { Api } from '@/@types/api'
import type { ShippingCosts } from '@/@types/shippingCosts'
import { Endpoints } from '@/services/api/endpoints'
import {
  CalculateShippingCostsRequest,
  ILogisticsController,
} from '@/services/api/interfaces/ILogisticsService'
import { Resources } from '@/services/api/resources'

export function logisticsController(api: Api): ILogisticsController {
  return {
    async calculateShippingCosts({
      zipcode,
      quantities,
      skus_ids,
      total,
    }: CalculateShippingCostsRequest) {
      const response = await api.post<
        CalculateShippingCostsRequest,
        ShippingCosts
      >(`/${Resources.LOGISTICS}/${Endpoints.SHIPPING_COST}`, {
        zipcode,
        quantities,
        skus_ids,
        total,
      })

      return response.data
    },
  }
}
