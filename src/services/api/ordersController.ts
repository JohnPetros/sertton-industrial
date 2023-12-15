import type { Api } from '@/@types/api'
import type { Order } from '@/@types/order'
import { IOrdersController } from '@/services/api/interfaces/IOrdersController'
import { Resources } from '@/services/api/resources'

export function ordersController(api: Api): IOrdersController {
  return {
    async saveOrder(order: Order) {
      await api.post(`/${Resources.ORDERS}`, order)
    },
  }
}
