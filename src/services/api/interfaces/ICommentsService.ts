import type { Comment } from '@/@types/comment'

export interface ICommentsService {
  getComments(): Promise<Comment[]>
}
