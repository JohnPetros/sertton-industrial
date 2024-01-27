import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { ILeadsController } from '@/services/api/interfaces/ILeadsController'
import { Endpoints } from '@/services/api/yampi/config/endpoints'

export function leadsController(api: IApiProvider): ILeadsController {
  return {
    async saveLead(email: string) {
      await api.post(`/${Endpoints.LEAD}`, { email })
    },
  }
}
