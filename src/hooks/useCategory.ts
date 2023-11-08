import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useCatogory(categoryId: string) {
  const api = useApi()

  const { data, error, isLoading } = useQuery(
    ['category'],
    () => api.getCategory(categoryId),
    {
      enabled: categoryId !== 'null',
    }
  )

  return {
    category: data,
    error,
    isLoading,
  }
}
