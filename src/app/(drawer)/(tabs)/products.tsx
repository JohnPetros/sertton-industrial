import { getTokens, H2, Paragraph, YStack } from 'tamagui'

import { Search } from '@/components/Form/Search'
import { Header } from '@/components/Header'
import { ProductsList } from '@/components/ProducstList'
import { useProducts } from '@/components/Products/useProducts'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export default function ProductsScreen() {
  const {
    products,
    category,
    isLoading,
    hasNextPage,
    refetch,
    setSelectedSorter,
    handleProductsListEndReached,
  } = useProducts()

  return (
    <YStack px={24}>
      <Header />
      <Search isFetching={isLoading} />

      {category && (
        <YStack mt={12}>
          <H2 fontSize={16} color="$gray600">
            {category.name}
          </H2>
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
