import type { Review } from '@/@types/review'

export interface IReviewsService {
  getProductReviews(productId: number): Promise<Review[]>
}
