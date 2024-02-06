import type { Sku } from '@/@types/sku'

export interface ISkusController {
  getSkusByProductId(productId: string): Promise<Sku[]>
}
