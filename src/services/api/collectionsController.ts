import type { Collection } from '@/@types/collection'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Endpoints } from '@/services/api/config/endpoints'
import { Resources } from '@/services/api/config/resources'
import { ICollectionsController } from '@/services/api/interfaces/ICollectionsService'

export function collectionsController(
  api: IApiProvider
): ICollectionsController {
  return {
    async getCollections() {
      const response = await api.get<{ data: Collection[] }>(
        `/${Resources.CATALOG}/${Endpoints.COLLECTION}?include=prods`
      )
      return response.data
    },
  }
}
