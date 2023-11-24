import { useState } from 'react'
import {
  Buildings,
  ChatCentered,
  ChatCenteredText,
  Question,
} from 'phosphor-react-native'
import { getTokens, H2, Paragraph, Text, YStack } from 'tamagui'

import type { Sorter } from '@/@types/sorter'
import { Header } from '@/components/Header'
import { ProductsList } from '@/components/ProductsList'
import { Search } from '@/components/Search'
import { Tabs } from '@/components/Tabs'
import { useCatogory } from '@/hooks/useCategory'
import { useProducts } from '@/hooks/useProducts'
import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export default function Products() {
  const { search, categoryId, brandsIds } = useProductsFilterStore(
    (store) => store.state
  )

  const [selectedSorter, setSelectedSorter] = useState<Sorter | null>(null)
  const { category } = useCatogory(categoryId)
  const { products, isLoading, hasNextPage, fetchNextPage, refetch } =
    useProducts({
      search,
      categoryId,
      sorter: selectedSorter,
      brandsIds,
    })

  console.log(isLoading)

  function handleProductsListEndReached() {
    fetchNextPage()
    console.log('reached')
  }

  return (
    <YStack px={24}>
      <Header />
      <Search isLoading={isLoading} />

      {category && (
        <YStack mt={12}>
          <H2 fontSize={16} color="$gray600">
            {category.name}
          </H2>
          <Paragraph fontSize={12} color={getTokens().color.white.val}>
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
