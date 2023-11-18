import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export default function useBrands() {
  const api = useApi()

  const { data, error, isLoading } = useQuery('brands', () => api.getBrands())

  return {
    brands: data,
    error,
    isLoading,
  }
}
