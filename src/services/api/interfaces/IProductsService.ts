import { Product } from '@/@types/product'

export interface IProductsService {
  getProductsByCollection(collectionId: number): Promise<Product[]>
}
