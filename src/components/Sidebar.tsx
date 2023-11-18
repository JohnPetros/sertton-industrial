import { ReactNode, useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDrawerStatus } from '@react-navigation/drawer'
import { useRouter } from 'expo-router'
import { CaretDown, CaretUp, Phone, WhatsappLogo } from 'phosphor-react-native'
import { getTokens, Separator, Text, View, XStack, YStack } from 'tamagui'
import { YGroup } from 'tamagui'
import { ListItem } from 'tamagui'

import { Contact, ContactType } from '@/@types/contact'
import { Button } from '@/components/Button'
import { Spinner } from '@/components/Spinner'
import { useCategories } from '@/hooks/useCategories'
import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { CONTACTS } from '@/utils/constants/contacts'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'

export function Sidebar() {
  const { categories } = useCategories()
  const [canShowAllCategories, setCanShowAllCategories] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const setCateforyId = useProductsFilterStore(
    (store) => store.actions.setCateforyId
  )
  const selectedCateforyId = useProductsFilterStore(
    (store) => store.state.categoryId
  )
  const router = useRouter()
  const isOpen = useDrawerStatus()

  const CONTACT_ICONS: Record<ContactType, ReactNode> = {
    whatsapp: <WhatsappLogo color={getTokens().color.green600.val} />,
    landline: <Phone color={getTokens().color.gray600.val} />,
  }

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

  useEffect(() => {
    if (isOpen === 'closed') setIsLoading(false)
  }, [isOpen])

  return (
    <SafeAreaView>
      <YStack
        my={-48}
        py={24}
        h={SCREEN.height}
        px={SCREEN.paddingX}
        bg="$gray50"
      >
        <Button
          background="transparent"
          color="$gray900"
          justifyContent="space-between"
          fontWeight="600"
          onPress={handleShowAllCategories}
          ml={-8}
        >
          Categorias {canShowAllCategories ? <CaretUp /> : <CaretDown />}
        </Button>
        <YGroup
          separator={
            <Separator bg="$gray400" alignSelf="stretch" vertical={false} />
          }
          borderRadius={4}
        >
          {categories
            ?.slice(0, !canShowAllCategories ? 4 : categories.length)
            .map((category) => (
              <YGroup.Item key={category.id.toString()}>
                <Button
                  background="transparent"
                  p={8}
                  ml={-8}
                  onPress={() => handleCategory(category.id)}
                >
                  <ListItem
                    title={category.name}
                    color="$gray700"
                    fontSize={14}
                    bg="$gray50"
                    position="relative"
                  />
                  <View position="absolute" r={8}>
                    {selectedCateforyId === category.id && isLoading && (
                      <Spinner />
                    )}
                  </View>
                </Button>
              </YGroup.Item>
            ))}
        </YGroup>
        <YStack mt={12}>
          {CONTACTS.map((contact) => (
            <Button
              key={contact.value}
              background="transparent"
              justifyContent="flex-start"
              px={0}
              onPress={() => handleContact(contact)}
            >
              <XStack gap={4}>
                {CONTACT_ICONS[contact.type]}
                <Text
                  color={contact.type === 'whatsapp' ? '$green600' : '$gray600'}
                  fontWeight="600"
                  fontSize={14}
                >
                  {contact.value}
                </Text>
              </XStack>
            </Button>
          ))}
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
