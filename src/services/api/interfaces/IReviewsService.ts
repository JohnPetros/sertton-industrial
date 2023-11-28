import type { Review } from '@/@types/review'

export interface IReviewsService {
  getProductReviews(productId: number): Promise<Review[]>
  postProductReview(data: Omit<Review, 'updated_at'>): Promise<void>
}
