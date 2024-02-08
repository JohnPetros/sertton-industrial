import { X } from 'phosphor-react-native'
import { Button, getTokens, H2, Paragraph, YStack } from 'tamagui'
import { XStack } from 'tamagui'

import { ProductsList } from './ProductsList'
import { useProducts } from './useProducts'

import { Header } from '@/components/shared/Header'
import { Search } from '@/components/shared/Search'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export function Products() {
  const {
    products,
    category,
    isLoading,
    hasNextPage,
    refetch,
    setSelectedSorter,
    handleRemoveCategory,
    handleProductsListEndReached,
  } = useProducts()

  return (
    <YStack px={24}>
      <Header />
      <Search isFetching={isLoading} />

      {category && (
        <YStack mt={12}>
          <XStack gap={12}>
            <H2 fontSize={16} color="$gray600">
              {category.name}
            </H2>
            <Button
              unstyled
              fontSize={12}
              alignSelf="center"
              alignItems="center"
              flexDirection="row"
              color="$white"
              bg="$gray200"
              borderRadius={8}
              paddingHorizontal={8}
              pressStyle={{ opacity: 0.7 }}
              onPress={handleRemoveCategory}
            >
              <X size={16} color={getTokens().color.white.val} weight="bold" />
              Remover categoria
            </Button>
          </XStack>
          <Paragraph fontSize={12} color={getTokens().color.gray700.val}>
            {removeHTMLTags(category.description)}
          </Paragraph>
        </YStack>
      )}

      <ProductsList
        products={products}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onRefresh={refetch}
        setSelectedSorter={setSelectedSorter}
        onEndReached={handleProductsListEndReached}
      />
    </YStack>
  )
}
