import { YampiSku } from '../types/YampiSku'

import { yampiImageAdapter } from './yampiImageAdapter'
import { yampiVariationAdapter } from './yampiVariationAdapter'

import type { Sku } from '@/@types/sku'

export function yampiSkuAdapter(yampiSku: YampiSku) {
  const images = yampiSku.images
    ? yampiImageAdapter(yampiSku.images.data[0])
    : []
  const variations =
    yampiSku.variations.length > 0
      ? yampiSku.variations.map(yampiVariationAdapter)
      : []

  const sku: Sku = {
    id: String(yampiSku.id),
    skuCode: yampiSku.sku,
    costPrice: yampiSku.price_cost,
    salePrice: yampiSku.price_sale,
    discountPrice: yampiSku.price_sale,
    weight: yampiSku.weight,
    height: yampiSku.height,
    width: yampiSku.width,
    length: yampiSku.length,
    stock: yampiSku.total_in_stock,
    yampiToken: yampiSku.token,
    images,
    variations,
  }

  return sku
}
