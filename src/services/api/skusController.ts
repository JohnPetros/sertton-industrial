import type { Sku } from '@/@types/sku'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Endpoints } from '@/services/api/config/endpoints'
import { Resources } from '@/services/api/config/resources'
import { ISkusController } from '@/services/api/interfaces/ISkusService'

export function skusController(api: IApiProvider): ISkusController {
  return {
    async getSkusByProductId(productId: number) {
      const response = await api.get<{ data: Sku[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${productId}/${Endpoints.SKU}?include=images`
      )
      return response.data
    },
  }
}
