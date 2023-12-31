import type { Api } from '@/@types/api'
import type { ShipmentService } from '@/@types/shipmentService'
import type { Sku } from '@/@types/sku'
import { IShipmentServiceController } from '@/services/api/interfaces/IShipmentServiceController'
import { Resources } from '@/services/api/resources'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'
const SHIPMENT_SERVICE_BASE_URL = !IS_TEST_ENV
  ? process.env.SHIPMENT_SERVICE_BASE_URL
  : 'msw'

export function shipmentServiceController(
  api: Api
): IShipmentServiceController {
  if (!SHIPMENT_SERVICE_BASE_URL)
    throw new Error('SHIPMENT SERVICE BASE URL must be provided')

  return {
    async getShipmentServices(
      zipcode: string,
      products: (Sku & { quantity: number })[]
    ) {
      api.setBaseUrl(SHIPMENT_SERVICE_BASE_URL)

      return await api.post<ShipmentService[]>(
        `/${Resources.SHIPMENT}/calculate`,
        { products, zipcode }
      )
    },
  }
}
