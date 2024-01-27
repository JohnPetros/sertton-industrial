import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Collection } from '@/@types/collection'
import { ICollectionsController } from '@/services/api/interfaces/ICollectionsService'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

export function collectionsController(
  http: IHttpProvider
): ICollectionsController {
  return {
    async getCollections() {
      const response = await http.get<{ data: Collection[] }>(
        `/${Resources.CATALOG}/${Endpoints.COLLECTION}?include=prods`
      )

      return response.data
    },
  }
}
