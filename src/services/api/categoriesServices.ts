import { Api } from '@/@types/api'
import { Category } from '@/@types/category'
import { Endpoints } from '@/services/api/endpoints'
import { ICategoriesService } from '@/services/api/interfaces/ICategoriesServices'
import { Resources } from '@/services/api/resources'

export function categoriesService(api: Api): ICategoriesService {
  return {
    async getCategories() {
      const response = await api.get<Category[]>(
        `/${Resources.CATALOG}/${Endpoints.COLLECTION}?limit=10`
      )

      const { data } = response.data
      return data
    },
  }
}
