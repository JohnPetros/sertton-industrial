import { Address } from '@/@types/address'

type Status =
  | 'paid'
  | 'created'
  | 'cancelled'
  | 'refused'
  | 'authorized'
  | 'delivered'
  | 'waiting_payment'

export type Order = {
  status: Status
  number: number
  customer_id: number
  value_products: number
  value_shipment: number
  value_discount: number
  shipment_service: string
  days_delivery: number
  address: Address
  items: {
    product_id: number
    sku_id: number
    quantity: number
    price: number
  }[]
  // transactions: {
  //   customer_id: number
  //   amount: number
  //   status: string
  //   holder_name: string
  // }
}
