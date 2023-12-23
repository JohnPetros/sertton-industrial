import { useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'

import { Product } from '@/@types/product'
import { Sorter } from '@/@types/sorter'
import { useCatogory } from '@/hooks/useCategory'
import { useApi } from '@/services/api'
import { useProductsFilterStore } from '@/stores/productsFilterStore'

const PER_PAGE = 20

export function useProducts() {
  const api = useApi()
  const currentPage = useRef(0)
  const hasNextPage = useRef(true)

  const { search, categoryId, brandsIds } = useProductsFilterStore(
    (store) => store.state
  )

  const [selectedSorter, setSelectedSorter] = useState<Sorter | null>(null)
  const { category } = useCatogory(categoryId)

  async function getProducts(page: number) {
    const { products, totalPages } = await api.getProducts({
      page,
      search,
      sorter: selectedSorter,
      categoryId,
      brandsIds,
    })

    return { products, totalPages }
  }

  const { data, isLoading, fetchNextPage, refetch } = useInfiniteQuery(
    ['products', selectedSorter, search, categoryId, brandsIds],
    ({ pageParam = 1 }) => {
      currentPage.current = pageParam
      return getProducts(pageParam)
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const totalProducts = allPages.reduce((total, currentPage) => {
          return total + currentPage.products.length
        }, 0)

        hasNextPage.current =
          Math.ceil(totalProducts / PER_PAGE) < lastPage.totalPages

        return hasNextPage.current ? currentPage.current + 1 : undefined
      },
    }
  )

  function handleProductsListEndReached() {
    console.log('fetchNextPage')
    fetchNextPage()
  }

  let products: Product[] = []

  products = useMemo(() => {
    if (!data) return []

    return data.pages.reduce((products, currentPage) => {
      return [...products, ...currentPage.products]
    }, [] as Product[])
  }, [data])

  console.log(products.length)

  return {
    products,
    category,
    isLoading,
    hasNextPage: products.length > 0 && hasNextPage.current,
    fetchNextPage,
    refetch,
    setSelectedSorter,
    handleProductsListEndReached,
  }
}
