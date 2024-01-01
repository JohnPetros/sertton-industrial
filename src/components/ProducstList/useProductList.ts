import { useEffect, useRef, useState } from 'react'

import { ProductsListProps } from '@/components/ProducstList'
import { SCREEN } from '@/utils/constants/screen'
import { SORTERS } from '@/utils/constants/sorters'

type Layout = 'mosaic' | 'list'

export function useProductsList({
  products,
  onEndReached,
  setSelectedSorter,
}: Omit<ProductsListProps, 'isLoading' | 'hasNextPage' | 'onRefresh'>) {
  const [layout, setLayout] = useState<Layout>('list')
  const isFetching = useRef(false)
  const totalProducts = useRef(0)
  const data = products.slice(0)

  const productWidth =
    layout === 'list'
      ? SCREEN.width - SCREEN.paddingX * 2
      : (SCREEN.width - SCREEN.paddingX * 2) / 2 - 12

  function handleLayoutToggle() {
    setLayout(layout === 'list' ? 'mosaic' : 'list')
  }

  function handleSelectChange(sorterName: string) {
    const sorter = SORTERS.find((sorte) => sorte.name === sorterName) ?? null
    setSelectedSorter(sorter)
  }

  function handleListEndReached() {
    if (!isFetching.current) {
      isFetching.current = true
      onEndReached()
    }
  }

  useEffect(() => {
    if (products.length > totalProducts.current) {
      totalProducts.current = products.length
      isFetching.current = false
    }
  }, [products])

  return {
    data,
    layout,
    productWidth,
    handleSelectChange,
    handleListEndReached,
    handleLayoutToggle,
  }
}
