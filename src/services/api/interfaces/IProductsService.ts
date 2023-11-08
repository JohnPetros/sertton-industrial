import { Product } from '@/@types/product'
import { Sorter } from '@/@types/sorter'

interface getProductsParams {
  page: number
  sorter: Sorter | null
  category_id: string | null
}

export interface IProductsService {
  getProductsByCollection(collectionId: number): Promise<Product[]>
  getProducts(params: getProductsParams): Promise<Product[]>
}
