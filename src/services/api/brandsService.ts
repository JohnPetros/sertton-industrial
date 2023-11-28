import type { Api } from '@/@types/api'
import type { Brand } from '@/@types/brand'
import { Endpoints } from '@/services/api/endpoints'
import { IBrandsService } from '@/services/api/interfaces/IBrandsService'
import { Resources } from '@/services/api/resources'

export function brandsService(api: Api): IBrandsService {
  return {
    async getBrands() {
      const response = await api.get<Brand[]>(
        `/${Resources.CATALOG}/${Endpoints.BRAND}`
      )

      return response.data
    },
  }
}
