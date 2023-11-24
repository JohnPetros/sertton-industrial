import type { Collection } from '@/@types/collection'

export interface ICollectionsService {
  getProductComments(productId: string): Promise<Collection[]>
}
