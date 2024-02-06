import type { Product } from '@/@types/product'
import type { Sorter } from '@/@types/sorter'

interface getProductsParams {
  page: number
  search: string
  sorter: Sorter | null
  categoryId: number
  brandsIds: number[]
}

export interface IProductsController {
  getProducts(
    params: getProductsParams
  ): Promise<{ products: Product[]; totalPages: number }>
  getProductsByCollection(collectionId: string): Promise<Product[]>
  getProductBySlug(slug: string): Promise<Product>
  getSimiliarProducts(id: string): Promise<Product[]>
}
