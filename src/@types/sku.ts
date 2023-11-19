import type { Image } from '@/@types/image'
import type { Variation } from '@/@types/variation'

export type Sku = {
  id: number
  sku: string
  price_cost: number
  price_sale: number
  price_discount: number
  weight: number
  height: number
  width: number
  length: number
  images: { data: Image[] }
  variations: Variation[]
  total_in_stock: number
}
