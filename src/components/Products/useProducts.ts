import { useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'

import { useAppError } from '../AppError/useAppError'

import { Product } from '@/@types/product'
import { Sorter } from '@/@types/sorter'
import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'
import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { CACHE } from '@/utils/constants/cache'

const PER_PAGE = 20

export function useProducts() {
  const api = useApi()
  const currentPage = useRef(0)
  const hasNextPage = useRef(true)

  console.log('PRODUCTS')

  const { throwAppError } = useAppError()

  const { search, categoryId, brandsIds } = useProductsFilterStore(
    (store) => store.state
  )
  const setCateforyId = useProductsFilterStore(
    (store) => store.actions.setCateforyId
  )

  const [selectedSorter, setSelectedSorter] = useState<Sorter | null>(null)

  async function getCategory() {
    try {
      return await api.getCategoryById(categoryId)
    } catch (error) {
      throwAppError('Erro ao definir categoria de produtos')
    }
  }

  const { data: category } = useCache({
    key: CACHE.keys.category,
    fetcher: getCategory,
    dependencies: [categoryId],
    isEnabled: !!categoryId,
  })

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

        console.log('hasNextPage', hasNextPage.current)

        return hasNextPage.current ? currentPage.current + 1 : undefined
      },
    }
  )

  function handleRemoveCategory() {
    setCateforyId('')
  }

  function handleProductsListEndReached() {
    console.log(data?.pages[0].products.length)
    fetchNextPage()
  }

  let products: Product[] = []

  products = useMemo(() => {
    if (!data) return []

    return data.pages.reduce((products, currentPage) => {
      return [...products, ...currentPage.products]
    }, [] as Product[])
  }, [data])

  return {
    products,
    category,
    isLoading,
    hasNextPage: products.length > 0 && hasNextPage.current,
    fetchNextPage,
    refetch,
    setSelectedSorter,
    handleProductsListEndReached,
    handleRemoveCategory,
  }
}
