import { useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'

import { Product } from '@/@types/product'
import { Sorter } from '@/@types/sorter'
import { useApi } from '@/services/api'

interface useProductsParams {
  sorter: Sorter | null
  category_id: string
}

export function useProducts({ sorter, category_id }: useProductsParams) {
  const api = useApi()

  const { data, error, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['products', sorter],
      ({ pageParam = 1 }) =>
        api.getProducts({
          page: pageParam,
          sorter,
          category_id: category_id !== 'null' ? category_id : null,
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
