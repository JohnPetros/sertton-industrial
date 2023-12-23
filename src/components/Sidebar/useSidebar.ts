import { useEffect, useState } from 'react'
import { useDrawerStatus } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { useRouter } from 'expo-router'

import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { ROUTES } from '@/utils/constants/routes'

export function useSidebar() {
  const [canShowAllCategories, setCanShowAllCategories] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const setCateforyId = useProductsFilterStore(
    (store) => store.actions.setCateforyId
  )

  const router = useRouter()
  const isOpen = useDrawerStatus()

  function handleShowAllCategories() {
    setCanShowAllCategories(!canShowAllCategories)
  }

  function handleCategory(categoryId: number) {
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
    handleCategory,
    handleShowAllCategories,
    handleNavigation,
  }
}
