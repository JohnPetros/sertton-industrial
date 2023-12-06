import type { Collection } from '@/@types/collection'

export interface ICollectionsController {
  getCollections(productId: string): Promise<Collection[]>
}
