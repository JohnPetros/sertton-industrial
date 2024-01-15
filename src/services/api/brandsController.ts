import type { Brand } from '@/@types/brand'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Endpoints } from '@/services/api/config/endpoints'
import { Resources } from '@/services/api/config/resources'
import { IBrandsController } from '@/services/api/interfaces/IBrandsService'

export function brandsController(api: IApiProvider): IBrandsController {
  return {
    async getBrands() {
      const response = await api.get<{ data: Brand[] }>(
        `/${Resources.CATALOG}/${Endpoints.BRAND}`
      )

      return response.data
    },
  }
}
