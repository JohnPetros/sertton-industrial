import { IHttpProvider } from '../../http/interfaces/IHttp'
import { yampiBrandAdapter } from '../adapters/yampiBrandAdapter'
import { YampiBrand } from '../types/YampiBrand'

import { IBrandsController } from '@/services/api/interfaces/IBrandsService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiBrandsController(http: IHttpProvider): IBrandsController {
  return {
    async getBrands() {
      const response = await http.get<{ data: YampiBrand[] }>(
        `/${Resources.CATALOG}/${Endpoints.BRAND}`
      )

      return response.data.map(yampiBrandAdapter)
    },
  }
}
