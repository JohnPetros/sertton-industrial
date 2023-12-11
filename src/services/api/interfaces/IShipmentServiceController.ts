import type { ShipmentService } from '@/@types/shipmentService'
import { Sku } from '@/@types/sku'

export interface IShipmentServiceController {
  getShipmentServices(
    zipcode: string,
    products: (Sku & { quantity: number })[]
  ): Promise<ShipmentService[]>
}
