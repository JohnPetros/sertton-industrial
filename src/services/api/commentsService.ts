import type { Api } from '@/@types/api'
import type { Comment } from '@/@types/comment'
import { Endpoints } from '@/services/api/endpoints'
import { ICommentsService } from '@/services/api/interfaces/ICommentsService'
import { Resources } from '@/services/api/resources'

export function commentsService(api: Api): ICommentsService {
  return {
    async getComments() {
      const response = await api.get<Comment[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${Endpoints.COMMENT}/`
      )

      const { data } = response.data
      return data
    },
  }
}
