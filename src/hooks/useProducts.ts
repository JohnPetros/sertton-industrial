import { useMemo, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'

import { Product } from '@/@types/product'
import { Sorter } from '@/@types/sorter'
import { useApi } from '@/services/api'

const PER_PAGE = 20

interface useProductsParams {
  search: string
  sorter: Sorter | null
  categoryId: number
  brandsIds: number[]
}

export function useProducts({
  search,
  sorter,
  categoryId,
  brandsIds,
}: useProductsParams) {
  const api = useApi()
  const currentPage = useRef(0)
  const hasNextPage = useRef(true)

  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery(
    ['products', sorter, search, categoryId, brandsIds],
    ({ pageParam = 1 }) => {
      currentPage.current = pageParam
      return api.getProducts({
        page: pageParam,
        search,
        sorter,
        categoryId,
        brandsIds,
      })
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalProducts = allPages.reduce((total, currentPage) => {
          return total + currentPage.products.length
        }, 0)

        hasNextPage.current = totalProducts / PER_PAGE <= lastPage.totalPages

        return hasNextPage.current ? currentPage.current + 1 : undefined
      },
    }
  )

  let products: Product[] = []

  products = useMemo(() => {
    if (!data) return []

    return data.pages.reduce((products, currentPage) => {
      return [...products, ...currentPage.products]
    }, [] as Product[])
  }, [data])

  return {
    products,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage: products.length > 0 && hasNextPage.current,
  }
}
