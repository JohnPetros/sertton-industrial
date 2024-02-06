import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Category } from '@/@types/category'
import { ICategoriesController } from '@/services/api/interfaces/ICategoriesService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiCategoriesController(
  http: IHttpProvider
): ICategoriesController {
  return {
    async getCategories() {
      const response = await http.get<{ data: Category[] }>(
        `/${Resources.CATALOG}/${Endpoints.CATEGORY}`
      )

      return response.data
    },

    async getCategory(categoryId: number) {
      const response = await http.get<{ data: Category }>(
        `/${Resources.CATALOG}/${Endpoints.CATEGORY}/${categoryId}`
      )
      return response.data
    },
  }
}
