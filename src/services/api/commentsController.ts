import type { Comment } from '@/@types/comment'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Endpoints } from '@/services/api/config/endpoints'
import { Resources } from '@/services/api/config/resources'
import { ICommentsController } from '@/services/api/interfaces/ICommentsService'

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
