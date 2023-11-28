import { useQuery } from 'react-query'

import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus'
import { useApi } from '@/services/api'

export function useProduct(slug: string) {
  const api = useApi()

  const {
    data: product,
    error: productError,
    isLoading,
    isRefetching,
    refetch,
  } = useQuery(['product', slug], () => api.getProductBySlug(slug))

  const { data: similarProducts, error: similarProductsError } = useQuery(
    ['similiar_products', product?.id],
    () => api.getSimiliarProducts(String(product?.id)),
    {
      enabled: !!product?.id,
    }
  )
  useRefetchOnFocus({ refetch })

  return {
    product,
    productError,
    similarProducts,
    similarProductsError,
    isLoading,
    isRefetching,
    refetch,
  }
}
