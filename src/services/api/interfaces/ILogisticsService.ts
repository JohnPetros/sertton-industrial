import type { ShippingCosts } from '@/@types/shippingCosts'

export interface CalculateShippmentCostsRequest {
  zipcode: string
  total: number
  skus_ids: number[]
  quantities: number[]
}

export interface ILogisticsService {
  calculateShippmentCosts(
    request: CalculateShippmentCostsRequest
  ): Promise<ShippingCosts>
}
