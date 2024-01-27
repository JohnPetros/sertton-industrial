import type { Variation } from '@/@types/variation'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { IVariationsController } from '@/services/api/interfaces/IVariationsService'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

export function variationsController(api: IApiProvider): IVariationsController {
  return {
    async getVariations() {
      const response = await api.get<{ data: Variation[] }>(
        `/${Resources.CATALOG}/${Endpoints.VARIATION}`
      )
      return response.data
    },
  }
}
