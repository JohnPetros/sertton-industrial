import { IHttpProvider } from '../../http/interfaces/IHttp'
import { yampiCategoryAdapter } from '../adapters/yampiCategoryAdapter'
import { YampiCategory } from '../types/YampiCategory'

import { ICategoriesController } from '@/services/api/interfaces/ICategoriesService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiCategoriesController(
  http: IHttpProvider
): ICategoriesController {
  return {
    async getCategories() {
      const response = await http.get<{ data: YampiCategory[] }>(
        `/${Resources.CATALOG}/${Endpoints.CATEGORY}`
      )

      return response.data.map(yampiCategoryAdapter)
    },

    async getCategoryById(categoryId: string) {
      const response = await http.get<{ data: YampiCategory }>(
        `/${Resources.CATALOG}/${Endpoints.CATEGORY}/${categoryId}`
      )

      return yampiCategoryAdapter(response.data)
    },
  }
}
