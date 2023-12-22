import { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  CaretDown,
  CaretUp,
  Phone,
  User,
  WhatsappLogo,
} from 'phosphor-react-native'
import { getTokens, Separator, Text, View, XStack, YStack } from 'tamagui'
import { YGroup } from 'tamagui'
import { ListItem } from 'tamagui'

import { ContactType } from '@/@types/contact'
import { Button } from '@/components/Button'
import { useSidebar } from '@/components/Sidebar/useSidebar'
import { Spinner } from '@/components/Spinner'
import { useCategories } from '@/hooks/useCategories'
import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { CONTACTS } from '@/utils/constants/contacts'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'

export function Sidebar() {
  const { categories } = useCategories()
  const selectedCategoryId = useProductsFilterStore(
    (store) => store.state.categoryId
  )
  const {
    canShowAllCategories,
    isLoading,
    handleCategory,
    handleContact,
    handleShowAllCategories,
    handleNavigation,
  } = useSidebar()

  const CONTACT_ICONS: Record<ContactType, ReactNode> = {
    whatsapp: <WhatsappLogo color={getTokens().color.green600.val} />,
    landline: <Phone color={getTokens().color.gray600.val} />,
  }

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
                    {selectedCategoryId === category.id && isLoading && (
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
          <Button
            background="transparent"
            justifyContent="flex-start"
            px={0}
            onPress={() => handleNavigation(ROUTES.profile)}
          >
            <User color={getTokens().color.gray600.val} />
            Meu cadastro
          </Button>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
