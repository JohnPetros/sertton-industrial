import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useProduct(slug: string) {
  const api = useApi()

  const { data, error, isLoading, isRefetching, refetch } = useQuery(
    ['category', slug],
    () => api.getProductBySlug(slug)
  )

  return {
    product: data,
    error,
    isLoading,
    isRefetching,
    refetch,
  }
}
