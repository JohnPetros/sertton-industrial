import type { Api } from '@/@types/api'
import type { Category } from '@/@types/category'
import { Endpoints } from '@/services/api/endpoints'
import { ICategoriesController } from '@/services/api/interfaces/ICategoriesService'
import { Resources } from '@/services/api/resources'

export function categoriesController(api: Api): ICategoriesController {
  return {
    async getCategories() {
      const response = await api.get<{ data: Category[] }>(
        `/${Resources.CATALOG}/${Endpoints.CATEGORY}`
      )

      return response.data
    },

    async getCategory(categoryId: number) {
      const response = await api.get<{ data: Category }>(
        `/${Resources.CATALOG}/${Endpoints.CATEGORY}/${categoryId}`
      )
      return response.data
    },
  }
}
