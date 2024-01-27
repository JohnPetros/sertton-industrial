import type { Review } from '@/@types/review'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { IReviewsController } from '@/services/api/interfaces/IReviewsService'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

export function reviewsController(api: IApiProvider): IReviewsController {
  return {
    async getProductReviews(productId: number) {
      const response = await api.get<{ data: Review[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${productId}/${Endpoints.REVIEW}`
      )

      return response.data
    },

    async postProductReview(review: Omit<Review, 'updated_at'>) {
      await api.post(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${review.product_id}/${Endpoints.REVIEW}`,
        review
      )
    },
  }
}
