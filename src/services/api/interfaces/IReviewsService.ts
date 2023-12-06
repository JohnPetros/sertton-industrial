import type { Review } from '@/@types/review'

export interface IReviewsController {
  getProductReviews(productId: number): Promise<Review[]>
  postProductReview(data: Omit<Review, 'updated_at'>): Promise<void>
}
