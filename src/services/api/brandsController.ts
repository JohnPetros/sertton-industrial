import type { Api } from '@/@types/api'
import type { Brand } from '@/@types/brand'
import { Endpoints } from '@/services/api/endpoints'
import { IBrandsController } from '@/services/api/interfaces/IBrandsService'
import { Resources } from '@/services/api/resources'

export function brandsController(api: Api): IBrandsController {
  return {
    async getBrands() {
      const response = await api.get<{ data: Brand[] }>(
        `/${Resources.CATALOG}/${Endpoints.BRAND}`
      )

      return response.data
    },
  }
}
