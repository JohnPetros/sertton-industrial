import type { Collection } from '@/@types/collection'

export interface ICollectionsController {
  getCollections(): Promise<Collection[]>
}
