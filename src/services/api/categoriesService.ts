import type { Api } from '@/@types/api'
import type { Category } from '@/@types/category'
import { Endpoints } from '@/services/api/endpoints'
import { ICategoriesService } from '@/services/api/interfaces/ICategoriesService'
import { Resources } from '@/services/api/resources'

export function categoriesService(api: Api): ICategoriesService {
  return {
    async getCategories() {
      const response = await api.get<Category[]>(
        `/${Resources.CATALOG}/${Endpoints.CATEGORY}`
      )

      const { data } = response.data
      return data
    },

    async getCategory(categoryId: number) {
      const response = await api.get<Category>(
        `/${Resources.CATALOG}/${Endpoints.CATEGORY}/${categoryId}`
      )
      const { data } = response.data
      return data
    },
  }
}
