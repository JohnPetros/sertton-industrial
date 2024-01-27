import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useRouter } from 'expo-router/src/hooks'

import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { ROUTES } from '@/utils/constants/routes'

export function useSearch(isFetching: boolean) {
  const setSearch = useProductsFilterStore((store) => store.actions.setSearch)
  const currentSearchValue = useProductsFilterStore(
    (store) => store.state.search
  )
  const [searchValue, setSearchValue] = useState(currentSearchValue)
  const [isLoading, setIsloading] = useState(false)
  const router = useRouter()

  function handleSearch() {
    if (!isFetching) {
      setSearch(searchValue.trim())
      router.push(ROUTES.products)
      Keyboard.dismiss()
    }
  }

  useEffect(() => {
    setIsloading(Boolean(isFetching))
  }, [isFetching])

  return {
    searchValue,
    isLoading,
    setSearchValue,
    handleSearch,
  }
}
