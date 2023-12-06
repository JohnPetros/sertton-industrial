import type { Sku } from '@/@types/sku'

export interface ISkusController {
  getSkusByProductId(productId: number): Promise<Sku[]>
}
