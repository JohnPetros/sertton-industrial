import type { Api } from '@/@types/api'
import type { Review } from '@/@types/review'
import { Endpoints } from '@/services/api/endpoints'
import { IReviewsService } from '@/services/api/interfaces/IReviewsService'
import { Resources } from '@/services/api/resources'

export function reviewsService(api: Api): IReviewsService {
  return {
    async getProductReviews(productId: number) {
      const response = await api.get<Review[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${productId}/${Endpoints.REVIEW}`
      )

      const { data } = response.data
      return data
    },
  }
}
