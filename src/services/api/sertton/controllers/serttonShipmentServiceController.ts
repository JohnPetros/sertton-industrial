import type { ShipmentService } from '@/@types/shipmentService'
import type { Sku } from '@/@types/sku'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { IShipmentServiceController } from '@/services/api/interfaces/IShipmentServiceController'
import { Resources } from '@/services/api/yampi/utils/resources'

export function serttonShipmentServiceController(
  api: IApiProvider
): IShipmentServiceController {
  return {
    async getShipmentServices(
      zipcode: string,
      products: (Sku & { quantity: number })[]
    ) {
      return await api.post<ShipmentService[]>(
        `/${Resources.SHIPMENT}/calculate`,
        { products, zipcode }
      )
    },
  }
}
