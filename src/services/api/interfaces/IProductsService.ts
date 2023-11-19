import type { Product } from '@/@types/product'
import type { Sorter } from '@/@types/sorter'

interface getProductsParams {
  page: number
  search: string
  sorter: Sorter | null
  categoryId: number
  brandsIds: number[]
}

export interface IProductsService {
  getProductsByCollection(collectionId: number): Promise<Product[]>
  getProducts(params: getProductsParams): Promise<Product[]>
  getProductBySlug(slug: string): Promise<Product>
  getSimiliarProducts(id: string): Promise<Product[]>
}
