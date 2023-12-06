import type { Comment } from '@/@types/comment'

export interface ICommentsController {
  getComments(): Promise<Comment[]>
}
