import { testApi } from '@/_tests_/configs/testApi'
import type { ShipmentService } from '@/@types/shipmentService'
import type { Sku } from '@/@types/sku'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Resources } from '@/services/api/config/resources'
import { IShipmentServiceController } from '@/services/api/interfaces/IShipmentServiceController'

const isTestEnv = process.env.NODE_ENV === 'test'

const SHIPMENT_SERVICE_BASE_URL = !isTestEnv
  ? process.env.SHIPMENT_SERVICE_BASE_URL
  : testApi.BASE_URL

export function shipmentServiceController(
  api: IApiProvider
): IShipmentServiceController {
  if (!SHIPMENT_SERVICE_BASE_URL)
    throw new Error('SHIPMENT SERVICE BASE URL must be provided')

  return {
    async getShipmentServices(
      zipcode: string,
      products: (Sku & { quantity: number })[]
    ) {
      console.log({ SHIPMENT_SERVICE_BASE_URL })

      api.setBaseUrl(SHIPMENT_SERVICE_BASE_URL)

      return await api.post<ShipmentService[]>(
        `/${Resources.SHIPMENT}/calculate`,
        { products, zipcode }
      )
    },
  }
}
