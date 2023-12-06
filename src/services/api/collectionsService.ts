import type { Api } from '@/@types/api'
import type { Collection } from '@/@types/collection'
import { Endpoints } from '@/services/api/endpoints'
import { ICollectionsController } from '@/services/api/interfaces/ICollectionsService'
import { Resources } from '@/services/api/resources'

export function collectionsController(api: Api): ICollectionsController {
  return {
    async getCollections() {
      const response = await api.get<{ data: Collection[] }>(
        `/${Resources.CATALOG}/${Endpoints.COLLECTION}?include=prods`
      )
      return response.data
    },
  }
}
