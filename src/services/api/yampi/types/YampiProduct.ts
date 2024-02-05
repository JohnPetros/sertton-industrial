import type { YampiBrand } from './YampiBrand'
import type { YampiImage } from './YampiImage'
import type { YampiSku } from './YampiSku'

export type YampiProduct = {
  id: number
  slug: string
  sku: number
  name: string
  description: string
  specifications: string
  skus: {
    data: YampiSku[]
  }
  images: {
    data: YampiImage[]
  }
  brand: {
    data: YampiBrand
  }
  texts: {
    data: {
      description: string
      specifications: string
    }
  }
}
