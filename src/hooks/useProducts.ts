import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useProducts() {
  const api = useApi()

  const { data, error, isLoading } = useQuery('products', () =>
    api.getProducts()
  )

  return {
    products: data,
    error,
    isLoading,
  }
}
