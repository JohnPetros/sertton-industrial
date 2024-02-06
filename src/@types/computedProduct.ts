import type { Product } from '@/@types/product'

export type ComputedProduct = Product & {
  quantity: number
  selectedSkuId: string
}
