import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useProductReviews(productId: number) {
  const api = useApi()

  const { data, error, isLoading } = useQuery(
    ['product_reviews', productId],
    () => api.getProductReviews(productId),
    {
      enabled: !!productId,
    }
  )

  return {
    reviews: data,
    error,
    isLoading,
  }
}
