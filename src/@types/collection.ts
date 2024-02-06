import type { Product } from '@/@types/product'

export type Collection = {
  id: string
  name: string
  products: Product[]
}
