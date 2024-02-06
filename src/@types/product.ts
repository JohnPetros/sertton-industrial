import type { Brand } from '@/@types/brand'
import type { Image } from '@/@types/productImage'
import type { Sku } from '@/@types/sku'

export type Product = {
  id: string
  slug: string
  skuCode: string
  name: string
  description: string
  specifications: string
  skus: Sku[]
  images: Image[]
  brand: Brand | null
}
