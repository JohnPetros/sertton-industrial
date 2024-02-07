import type { YampiProduct } from '../types/YampiProduct'

import { yampiBrandAdapter } from './yampiBrandAdapter'
import { yampiImageAdapter } from './yampiImageAdapter'
import { yampiSkuAdapter } from './yampiSkuAdapter'

import type { Product } from '@/@types/product'

export function yampiProductAdapter(yampiProduct: YampiProduct) {
  const imageUrl = yampiProduct.images
    ? yampiImageAdapter(yampiProduct.images.data[0])
    : ''
  const skus = yampiProduct.skus
    ? yampiProduct.skus.data.map(yampiSkuAdapter)
    : []
  const brand = yampiProduct.brand
    ? yampiBrandAdapter(yampiProduct.brand.data)
    : null
  const description = yampiProduct.texts
    ? yampiProduct.texts.data.description
    : ''
  const specifications = yampiProduct.texts
    ? yampiProduct.texts.data.specifications
    : ''

  const product: Product = {
    id: String(yampiProduct.id),
    skuCode: String(yampiProduct.sku).split(',')[0],
    name: yampiProduct.name,
    slug: yampiProduct.slug,
    description,
    specifications,
    brand,
    skus,
    imageUrl: imageUrl,
  }

  return product
}
