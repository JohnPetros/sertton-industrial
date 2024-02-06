import { IHttpProvider } from '../../http/interfaces/IHttp'

import { ComputedOrder } from '@/@types/computedOrder'
import type { Order } from '@/@types/order'
import { IOrdersController } from '@/services/api/interfaces/IOrdersController'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiOrdersController(http: IHttpProvider): IOrdersController {
  return {
    async saveOrder(order: Order) {
      await http.post(`/${Resources.ORDERS}`, order)
    },

    async getOrdersByCustomerDocument(document: string) {
      const response = await http.get<{ data: ComputedOrder[] }>(
        `/${Resources.ORDERS}?q=${document}`
      )
      return response.data
    },
  }
}
