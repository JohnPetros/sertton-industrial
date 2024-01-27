import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Brand } from '@/@types/brand'
import { IBrandsController } from '@/services/api/interfaces/IBrandsService'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

export function brandsController(http: IHttpProvider): IBrandsController {
  return {
    async getBrands() {
      const response = await http.get<{ data: Brand[] }>(
        `/${Resources.CATALOG}/${Endpoints.BRAND}`
      )

      return response.data
    },
  }
}
