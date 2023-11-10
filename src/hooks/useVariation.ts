import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useVariations() {
  const api = useApi()

  const { data, error } = useQuery('variations', () => api.getVariations())

  return {
    variations: data,
    error,
  }
}
