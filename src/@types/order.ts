import { Address } from '@/@types/address'

export type OrderStatus =
  | 'paid'
  | 'created'
  | 'cancelled'
  | 'refused'
  | 'authorized'
  | 'delivered'
  | 'waiting_payment'

export type Order = {
  status: OrderStatus
  number: number
  customer_id: number
  value_products: number
  value_shipment: number
  value_discount: number
  value_total: number
  shipment_service: string
  days_delivery: number
  address: (Omit<Address, 'zip_code'> & { zipcode: string })[]
  items: {
    product_id: number
    sku_id: number
    quantity: number
    price: number
  }[]
  transactions: {
    customer_id: number
    amount: number
    installments: number
    status: OrderStatus
    holder_name: string
    holder_document: string
    authorized_at: string
    billet_url?: string
  }[]
}
