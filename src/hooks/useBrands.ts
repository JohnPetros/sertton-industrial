import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import type { Product } from '@/@types/product'
import { useApi } from '@/services/api'

export default function useBrands(products: Product[]) {
  const api = useApi()
  const [brandsIds, setBrandsIds] = useState<number[]>([])

  const { data, error, isLoading } = useQuery(
    ['brands', brandsIds],
    () => api.getBrands(),
    {
      enabled: brandsIds.length > 0,
    }
  )

  useEffect(() => {
    const brandsIds = [
      ...new Set(products.map((product) => product.brand.data.id)),
    ]

    setBrandsIds(brandsIds)
  }, [products])

  return {
    brands: data?.filter((brand) => brandsIds.includes(brand.id)),
    error,
    isLoading,
  }
}
