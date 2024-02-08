import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'
import { CACHE } from '@/utils/constants/cache'

export function useCategories() {
  const api = useApi()

  const { data, error, isLoading } = useCache({
    key: CACHE.keys.categories,
    fetcher: api.getCategories,
  })

  return {
    categories: data,
    error,
    isLoading,
  }
}
