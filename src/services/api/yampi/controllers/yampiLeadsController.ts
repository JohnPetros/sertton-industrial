import { IHttpProvider } from '../../http/interfaces/IHttp'

import { ILeadsController } from '@/services/api/interfaces/ILeadsController'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'

export function yampiLeadsController(http: IHttpProvider): ILeadsController {
  return {
    async saveLead(email: string) {
      await http.post(`/${Endpoints.LEAD}`, { email })
    },
  }
}
