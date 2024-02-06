import { IHttpProvider } from '../../http/interfaces/IHttp'
import { yampiCollectionAdapter } from '../adapters/yampiCollectionAdapter'
import { YampiCollection } from '../types/YampiCollection'

import type { Collection } from '@/@types/collection'
import { ICollectionsController } from '@/services/api/interfaces/ICollectionsService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiCollectionsController(
  http: IHttpProvider
): ICollectionsController {
  return {
    async getCollections() {
      const response = await http.get<{ data: YampiCollection[] }>(
        `/${Resources.CATALOG}/${Endpoints.COLLECTION}?include=prods`
      )

      const collections: Collection[] = response.data.map(
        yampiCollectionAdapter
      )

      return collections
    },
  }
}
