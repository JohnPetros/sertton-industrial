import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Endpoints } from '@/services/api/config/endpoints'
import { ILeadsController } from '@/services/api/interfaces/ILeadsController'

export function leadsController(api: IApiProvider): ILeadsController {
  return {
    async saveLead(email: string) {
      await api.post(`/${Endpoints.LEAD}`, { email })
    },
  }
}
