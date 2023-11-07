import { Product } from '@/@types/product'

export interface IProductsService {
  getCategories(params: getProductsParams): Promise<Product[]>
}
