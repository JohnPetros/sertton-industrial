import type { ComputedOrder } from '@/@types/computedOrder'
import type { Order } from '@/@types/order'
export interface IOrdersController {
  saveOrder(order: Order): Promise<void>
  getOrdersByCustomerDocument(document: string): Promise<ComputedOrder[]>
}
