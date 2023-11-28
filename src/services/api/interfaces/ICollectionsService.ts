import type { Collection } from '@/@types/collection'

export interface ICollectionsService {
  getCollections(productId: string): Promise<Collection[]>
}
