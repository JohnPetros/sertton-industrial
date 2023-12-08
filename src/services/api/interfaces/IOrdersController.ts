import type { Customer } from '@/@types/customer'

export type CheckoutRequest = {
  customer: Customer
  products: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export interface IOrdersController {
  checkout(request: CheckoutRequest): Promise<string>
}
