import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Variation } from '@/@types/variation'
import { IVariationsController } from '@/services/api/interfaces/IVariationsService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiVariationsController(
  http: IHttpProvider
): IVariationsController {
  return {
    async getVariations() {
      const response = await http.get<{ data: Variation[] }>(
        `/${Resources.CATALOG}/${Endpoints.VARIATION}`
      )
      return response.data
    },
  }
}
