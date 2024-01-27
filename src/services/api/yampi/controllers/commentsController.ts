import type { Comment } from '@/@types/comment'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { ICommentsController } from '@/services/api/interfaces/ICommentsService'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

export function commentsController(api: IApiProvider): ICommentsController {
  return {
    async getComments() {
      const response = await api.get<{ data: Comment[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${Endpoints.COMMENT}/`
      )

      return response.data
    },
  }
}
