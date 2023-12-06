import type { Api } from '@/@types/api'
import type { Variation } from '@/@types/variation'
import { Endpoints } from '@/services/api/endpoints'
import { IVariationsController } from '@/services/api/interfaces/IVariationsService'
import { Resources } from '@/services/api/resources'

export function variationsController(api: Api): IVariationsController {
  return {
    async getVariations() {
      const response = await api.get<{ data: Variation[] }>(
        `/${Resources.CATALOG}/${Endpoints.VARIATION}`
      )
      return response.data
    },
  }
}
