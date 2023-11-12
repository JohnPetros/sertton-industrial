import type { Brand } from '@/@types/brand'
import type { Image } from '@/@types/image'
import type { Sku } from '@/@types/sku'

export type Product = {
  id: number
  slug: string
  sku: number
  name: string
  description: string
  skus: {
    data: Sku[]
  }
  images: {
    data: Image[]
  }
  brand: {
    data: Brand
  }
}
