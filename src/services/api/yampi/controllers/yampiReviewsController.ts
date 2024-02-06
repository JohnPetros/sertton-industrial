import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Review } from '@/@types/review'
import { IReviewsController } from '@/services/api/interfaces/IReviewsService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiReviewsController(
  http: IHttpProvider
): IReviewsController {
  return {
    async getProductReviews(productId: number) {
      const response = await http.get<{ data: Review[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${productId}/${Endpoints.REVIEW}`
      )

      return response.data
    },

    async postProductReview(review: Omit<Review, 'updated_at'>) {
      await http.post(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${review.product_id}/${Endpoints.REVIEW}`,
        review
      )
    },
  }
}
