import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { usePathname, useRouter } from 'expo-router'

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
  const pathname = usePathname()

  function handleSearch() {
    if (!isFetching) {
      setSearch(searchValue.trim())
      if (pathname !== ROUTES.products) router.push(ROUTES.products)
      Keyboard.dismiss()
    }
  }

  useEffect(() => {
    setIsloading(Boolean(isFetching))
  }, [isFetching])

  useEffect(() => {
    setSearchValue(currentSearchValue)
  }, [pathname, setSearch])

  return {
    searchValue,
    isLoading,
    setSearchValue,
    handleSearch,
  }
}
