import { useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'

import { Product } from '@/@types/product'
import { Sorter } from '@/@types/sorter'
import { useApi } from '@/services/api'

interface useProductsParams {
  search: string
  sorter: Sorter | null
  categoryId: number
}

export function useProducts({ search, sorter, categoryId }: useProductsParams) {
  const api = useApi()

  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery(
    ['products', sorter, search, categoryId],
    ({ pageParam = 1 }) =>
      api.getProducts({
        page: pageParam,
        search,
        sorter,
        categoryId,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined
      },
    }
  )

  let products: Product[] = []

  products = useMemo(() => {
    if (!data) return []

    return data.pages.reduce((totalPages, currentPage) => {
      return [...totalPages, ...currentPage]
    })
  }, [data])

  return {
    products,
    error,
    isLoading,
    fetchNextPage,
  }
}
