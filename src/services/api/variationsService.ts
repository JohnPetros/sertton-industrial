import { Api } from '@/@types/api'
import { Variation } from '@/@types/variation'
import { Endpoints } from '@/services/api/endpoints'
import { IVariationsService } from '@/services/api/interfaces/IVariationsService'
import { Resources } from '@/services/api/resources'

export function variationsService(api: Api): IVariationsService {
  return {
    async getVariations() {
      const response = await api.get<Variation[]>(
        `/${Resources.CATALOG}/${Endpoints.VARIATION}`
      )
      const { data } = response.data
      return data
    },
  }
}
