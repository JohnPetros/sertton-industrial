import type { Variation } from '@/@types/variation'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Endpoints } from '@/services/api/config/endpoints'
import { Resources } from '@/services/api/config/resources'
import { IVariationsController } from '@/services/api/interfaces/IVariationsService'

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
