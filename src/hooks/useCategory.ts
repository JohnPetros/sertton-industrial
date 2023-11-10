import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useCatogory(categoryId: number) {
  const api = useApi()

  const { data, error, isLoading } = useQuery(
    ['category', categoryId],
    () => api.getCategory(categoryId),
    {
      enabled: !!categoryId,
    }
  )

  return {
    category: data,
    error,
    isLoading,
  }
}
