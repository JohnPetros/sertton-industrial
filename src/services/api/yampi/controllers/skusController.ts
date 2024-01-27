import type { Sku } from '@/@types/sku'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { ISkusController } from '@/services/api/interfaces/ISkusService'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

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
