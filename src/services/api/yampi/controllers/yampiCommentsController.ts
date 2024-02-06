import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Comment } from '@/@types/comment'
import { ICommentsController } from '@/services/api/interfaces/ICommentsService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiCommentsController(
  http: IHttpProvider
): ICommentsController {
  return {
    async getComments() {
      const response = await http.get<{ data: Comment[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${Endpoints.COMMENT}/`
      )

      return response.data
    },
  }
}
