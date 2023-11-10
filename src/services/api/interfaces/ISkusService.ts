import type { Sku } from '@/@types/sku'

export interface ISkusService {
  getSkusByProductId(productId: number): Promise<Sku[]>
}
