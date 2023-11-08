import { Variation } from '@/@types/variation'

export type Sku = {
  sku: string
  price_cost: number
  price_sale: number
  price_discount: number
  weight: number
  height: number
  width: number
  length: number
  variations: Variation[]
}
