import type { PaymentMethod } from '@/@types/paymentMethod'
import type { ShipmentService } from '@/@types/shipmentService'
import type { Transaction } from '@/@types/transaction'

export type CreateTransactionRequest = {
  paymentMethod: PaymentMethod
  customer: {
    id: string
    email: string
    name: string
    phone: string
    type: 'legal' | 'natural'
    document: string
    address: {
      number: number
      street: string
      neighborhood: string
      zipCode: string
      city: string
      state: string
    }
  }
  products: {
    id: string
    name: string
    sku: string
    quantity: number
    price: number
    length: number
    width: number
    height: number
    weight: number
  }[]
  shipmentService: ShipmentService
  cardToken?: string
}

export interface IPaymentController {
  createTransaction(request: CreateTransactionRequest): Promise<Transaction>
}
