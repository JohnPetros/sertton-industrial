import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useDrawerStatus } from '@react-navigation/drawer'
import { DrawerActions } from '@react-navigation/native'
import { useRouter } from 'expo-router'

import { Contact } from '@/@types/contact'
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

  function handleContact(contact: Contact) {
    switch (contact.type) {
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?phone=${contact.value}`)
        break
      case 'landline':
        Linking.openURL(`tel:${contact.value}`)
        break
      default:
        return
    }
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
    handleContact,
    handleNavigation,
  }
}
