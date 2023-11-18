import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useCategories() {
  const api = useApi()

  const { data, error, isLoading } = useQuery('categories', () =>
    api.getCategories()
  )

  return {
    categories: data,
    error,
    isLoading,
  }
}
