import { Collection } from '@/@types/collection'

export interface ICollectionsService {
  getCollections(): Promise<Collection[]>
}
