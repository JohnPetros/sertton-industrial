import type { Product } from '@/@types/product'

export type Collection = {
  id: number
  name: string
  products: Product[]
}
