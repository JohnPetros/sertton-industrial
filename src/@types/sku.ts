import type { Image } from '@/@types/productImage'
import type { Variation } from '@/@types/variation'

export type Sku = {
  id: string
  skuCode: string
  costPrice: number
  salePrice: number
  discountPrice: number
  weight: number
  height: number
  width: number
  length: number
  images: Image[]
  variations: Variation[]
  stock: number
  yampiToken: string
}
