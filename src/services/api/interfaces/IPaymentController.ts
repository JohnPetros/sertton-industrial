import type { CreditCard } from '@/@types/creditCard'

export type CheckoutRequest = {
  customer: {
    id: string
    name: string
    email: string
  }
  products: {
    id: string
    name: string
    price: number
    quantity: number
  }[]
}

export interface IPaymentController {
  checkout(request: CheckoutRequest): Promise<string>
  tokenizeCreditCard(creditCard: CreditCard): Promise<string>
}
