import { Sku } from '@/@types/sku'

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
  sku: number
  name: string
  description: string
  skus: {
    data: Sku[]
  }
  images: {
    data: Image[]
  }
}
