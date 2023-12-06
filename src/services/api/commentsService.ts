import type { Api } from '@/@types/api'
import type { Comment } from '@/@types/comment'
import { Endpoints } from '@/services/api/endpoints'
import { ICommentsController } from '@/services/api/interfaces/ICommentsService'
import { Resources } from '@/services/api/resources'

export function commentsController(api: Api): ICommentsController {
  return {
    async getComments() {
      const response = await api.get<{ data: Comment[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${Endpoints.COMMENT}/`
      )

      return response.data
    },
  }
}
