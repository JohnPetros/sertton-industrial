import type { Brand } from '@/@types/brand'
import type { Sku } from '@/@types/sku'

export type ImageSize = 'small' | 'thumb' | 'medium' | 'large'

export type Image = {
  [key in ImageSize]: {
    width: number
    height: number
    url: string
  }
}

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
