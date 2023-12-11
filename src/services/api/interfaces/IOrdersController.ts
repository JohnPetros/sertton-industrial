import { Order } from '@/@types/order'
export interface IOrdersController {
  saveOrder(order: Order): Promise<void>
}
