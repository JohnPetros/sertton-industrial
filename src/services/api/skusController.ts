import type { Api } from '@/@types/api'
import type { Sku } from '@/@types/sku'
import { Endpoints } from '@/services/api/endpoints'
import { ISkusController } from '@/services/api/interfaces/ISkusService'
import { Resources } from '@/services/api/resources'

export function skusController(api: Api): ISkusController {
  return {
    async getSkusByProductId(productId: number) {
      const response = await api.get<{ data: Sku[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${productId}/${Endpoints.SKU}?include=images`
      )
      return response.data
    },
  }
}
