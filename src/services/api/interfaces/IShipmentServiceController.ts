import type { ComputedSku } from '@/@types/computedSku'
import type { ShipmentService } from '@/@types/shipmentService'

export interface IShipmentServiceController {
  getShipmentServices(
    zipcode: string,
    products: ComputedSku[]
  ): Promise<ShipmentService[]>
}
