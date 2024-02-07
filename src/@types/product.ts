import type { Brand } from '@/@types/brand'
import type { Sku } from '@/@types/sku'

export type Product = {
  id: string
  slug: string
  skuCode: string
  name: string
  description: string
  specifications: string
  skus: Sku[]
  imageUrl: string
  brand: Brand | null
}
