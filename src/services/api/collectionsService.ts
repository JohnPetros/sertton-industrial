import { Api } from '@/@types/api'
import { Collection } from '@/@types/collection'
import { Endpoints } from '@/services/api/endpoints'
import { ICollectionsService } from '@/services/api/interfaces/ICollectionsService'
import { Resources } from '@/services/api/resources'

export function collectionsService(api: Api): ICollectionsService {
  return {
    async getCollections() {
      const response = await api.get<Collection[]>(
        `/${Resources.CATALOG}/${Endpoints.COLLECTION}?include=prods`
      )
      const { data } = response.data
      return data
    },
  }
}
