import type { Category } from '@/@types/category'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { ICategoriesController } from '@/services/api/interfaces/ICategoriesService'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

export function categoriesController(api: IApiProvider): ICategoriesController {
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
