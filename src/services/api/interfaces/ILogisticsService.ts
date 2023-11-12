import type { ShippingCosts } from '@/@types/shippingCosts'

export interface CalculateShippingCostsRequest {
  zipcode: string
  total: number
  skus_ids: number[]
  quantities: number[]
}

export interface ILogisticsService {
  calculateShippingCosts(
    request: CalculateShippingCostsRequest
  ): Promise<ShippingCosts>
}
