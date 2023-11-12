import type { Api } from '@/@types/api'
import type { Sku } from '@/@types/sku'
import { Endpoints } from '@/services/api/endpoints'
import { ISkusService } from '@/services/api/interfaces/ISkusService'
import { Resources } from '@/services/api/resources'

export function skusService(api: Api): ISkusService {
  return {
    async getSkusByProductId(productId: number) {
      const response = await api.get<Sku[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${productId}/${Endpoints.SKU}?include=images`
      )
      const { data } = response.data
      return data
    },
  }
}
