import { SafeAreaView } from 'react-native-safe-area-context'
import {
  CaretDown,
  CaretUp,
  Lock,
  Scroll,
  Truck,
  User,
} from 'phosphor-react-native'
import { Separator, View, YStack } from 'tamagui'
import { YGroup } from 'tamagui'
import { ListItem } from 'tamagui'
import { Spinner } from 'tamagui'
import { RouteButton } from '@/components/layout/Sidebar/RouteButton'
import { useSidebar } from '@/components/layout/Sidebar/useSidebar'

import { Contacts } from '@/components/shared/Contacts'
import { Button } from '@/components/shared/Button'
import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'

export function Sidebar() {
  const selectedCategoryId = useProductsFilterStore(
    (store) => store.state.categoryId
  )
  const {
    canShowAllCategories,
    categories,
    isLoading,
    handleCategory,
    handleShowAllCategories,
    handleNavigation,
  } = useSidebar()

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
                      <Spinner color="$blue700" />
                    )}
                  </View>
                </Button>
              </YGroup.Item>
            ))}
        </YGroup>
        <YStack mt={12}>
          <Contacts />

          <RouteButton
            icon={User}
            onPress={() => handleNavigation(ROUTES.profile)}
          >
            Meu cadastro
          </RouteButton>
          <RouteButton
            icon={Lock}
            onPress={() => handleNavigation(ROUTES.privacyPolicy)}
          >
            Politicas de privacidade
          </RouteButton>
          <RouteButton
            icon={Scroll}
            onPress={() => handleNavigation(ROUTES.termsAndConditions)}
          >
            Termos e condições
          </RouteButton>
          <RouteButton
            icon={Truck}
            onPress={() => handleNavigation(ROUTES.about)}
          >
            Sobre a Sertton Industrial
          </RouteButton>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
