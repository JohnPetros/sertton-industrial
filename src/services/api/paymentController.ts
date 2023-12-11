import type { Api } from '@/@types/api'
import { CheckoutRequest } from '@/services/api/interfaces/IPaymentController'
import { IPaymentController } from '@/services/api/interfaces/IPaymentController'
import { Resources } from '@/services/api/resources'

const SHIPMENT_SERVICE_BASE_URL = process.env.SHIPMENT_SERVICE_BASE_URL

export function paymentController(api: Api): IPaymentController {
  if (!SHIPMENT_SERVICE_BASE_URL)
    throw new Error('SHIPMENT SERVICE BASE URL must be provided')

  return {
    async checkout({ customer, products }: CheckoutRequest) {
      api.setBaseUrl(SHIPMENT_SERVICE_BASE_URL)

      const response = await api.post<{ checkoutUrl: string }>(
        `/${Resources.PAYMENT}/checkout`,
        { customer, products }
      )

      api.setDefaultConfig()

      return response.checkoutUrl
    },
  }
}
