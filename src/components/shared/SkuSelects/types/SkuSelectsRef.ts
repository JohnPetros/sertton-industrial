import type { Sku } from '@/@types/sku'

export type SkuSelectsRef = {
  selectedSku: Sku | null
  onAddSkuToCart: () => boolean
}
