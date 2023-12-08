import type { Api } from '@/@types/api'
import {
  CheckoutRequest,
  IOrdersController,
} from '@/services/api/interfaces/IOrdersController'
import { Resources } from '@/services/api/resources'

export function ordersController(api: Api): IOrdersController {
  return {
    async checkout({ customer, products }: CheckoutRequest) {
      api.setBaseUrl('https://sdl5yh-3333.csb.app')

      const response = await api.post<{ checkoutUrl: string }>(
        `/${Resources.PAYMENT}/checkout`,
        { customer, products }
      )

      return response.checkoutUrl
    },
  }
}
