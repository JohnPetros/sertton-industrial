import type { Api } from '@/@types/api'
import type { Category } from '@/@types/category'
import { Endpoints } from '@/services/api/endpoints'
import { IBrandsService } from '@/services/api/interfaces/IBrandsService'
import { Resources } from '@/services/api/resources'

export function brandsService(api: Api): IBrandsService {
  return {
    async getBrands() {
      const response = await api.get<Category[]>(
        `/${Resources.CATALOG}/${Endpoints.BRAND}`
      )

      const { data } = response.data
      return data
    },
  }
}
