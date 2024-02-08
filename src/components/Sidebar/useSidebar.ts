import { useEffect, useState } from 'react'
import { useDrawerStatus } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { useRouter } from 'expo-router'

import { useAppError } from '../AppError/useAppError'

import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'
import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { CACHE } from '@/utils/constants/cache'
import { ROUTES } from '@/utils/constants/routes'

export function useSidebar() {
  const [canShowAllCategories, setCanShowAllCategories] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const setCateforyId = useProductsFilterStore(
    (store) => store.actions.setCateforyId
  )

  const api = useApi()
  const router = useRouter()
  const isOpen = useDrawerStatus()
  const { throwAppError } = useAppError()

  const { data: categories, error } = useCache({
    key: CACHE.keys.categories,
    fetcher: api.getCategories,
  })

  if (error) {
    console.error
    throwAppError('Error ao mostrar categorias')
  }

  function handleShowAllCategories() {
    setCanShowAllCategories(!canShowAllCategories)
  }

  function handleCategory(categoryId: string) {
    setIsLoading(true)
    setCateforyId(categoryId)
    router.push(ROUTES.products)
  }

  function handleNavigation(route: string) {
    DrawerActions.closeDrawer()
    router.push(route)
  }

  useEffect(() => {
    if (isOpen === 'closed') setIsLoading(false)
  }, [isOpen])

  return {
    canShowAllCategories,
    isLoading,
    categories,
    handleCategory,
    handleShowAllCategories,
    handleNavigation,
  }
}
