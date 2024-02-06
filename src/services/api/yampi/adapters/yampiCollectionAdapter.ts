import { YampiCollection } from '../types/YampiCollection'

import { Collection } from '@/@types/collection'

export function yampiCollectionAdapter(yampiCollection: YampiCollection) {
  const collection: Collection = {
    id: String(yampiCollection.id),
    name: String(yampiCollection.name),
    products: [],
  }

  return collection
}
