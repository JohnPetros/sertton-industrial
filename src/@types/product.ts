import type { Brand } from '@/@types/brand'
import type { Image } from '@/@types/image'
import type { Sku } from '@/@types/sku'

export type Product = {
  id: number
  slug: string
  skuCode: number
  name: string
  description: string
  specifications: string
  skus: Sku[]
  images: Image[]
  brand: Brand
}
