import type { ShippingCosts } from '@/@types/shippingCosts'

export interface CalculateShippingCostsRequest {
  zipcode: string
  total: number
  skusIds: number[]
  quantities: number[]
}

export interface ILogisticsController {
  calculateShippingCosts(
    request: CalculateShippingCostsRequest
  ): Promise<ShippingCosts>
}
