import type { Api } from '@/@types/api'
import { Endpoints } from '@/services/api/endpoints'
import { ILeadsController } from '@/services/api/interfaces/ILeadsController'

export function leadsController(api: Api): ILeadsController {
  return {
    async saveLead(email: string) {
      await api.post(`/${Endpoints.LEAD}`, { email })
    },
  }
}
