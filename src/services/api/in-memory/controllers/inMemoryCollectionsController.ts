import { ICollectionsController } from '../../interfaces/ICollectionsService'

import { collectionsMock } from '@/_tests_/mocks/collectionsMock'
import type { Collection } from '@/@types/collection'

export function inMemoryCollectionsController(): ICollectionsController {
  const collections: Collection[] = collectionsMock

  return {
    async getCollections() {
      return collections
    },
  }
}
