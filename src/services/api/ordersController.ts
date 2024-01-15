import { ComputedOrder } from '@/@types/computedOrder'
import type { Order } from '@/@types/order'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Resources } from '@/services/api/config/resources'
import { IOrdersController } from '@/services/api/interfaces/IOrdersController'

export function ordersController(api: IApiProvider): IOrdersController {
  return {
    async saveOrder(order: Order) {
      await api.post(`/${Resources.ORDERS}`, order)
    },

    async getOrdersByCustomerDocument(document: string) {
      const response = await api.get<{ data: ComputedOrder[] }>(
        `/${Resources.ORDERS}?q=${document}`
      )
      return response.data
    },
  }
}
