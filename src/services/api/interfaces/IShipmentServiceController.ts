import type { ComputedSku } from '@/@types/ComputedSku'
import type { ShipmentService } from '@/@types/shipmentService'

export interface IShipmentServiceController {
  getShipmentServices(
    zipcode: string,
    products: ComputedSku[]
  ): Promise<ShipmentService[]>
}
