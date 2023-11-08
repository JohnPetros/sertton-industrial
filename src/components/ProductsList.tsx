import { useState } from 'react'
import { Dimensions, FlatList } from 'react-native'
import { ArrowsDownUp, Faders, List, Table } from 'phosphor-react-native'
import { Button, getTokens, Text, View, XStack, YStack } from 'tamagui'

import { Product } from '@/@types/product'
import type { Sorter } from '@/@types/sorter'
import { Loading } from '@/components/Loading'
import { ProductItem } from '@/components/ProductItem'
import { Select } from '@/components/Select'
import { productsMock } from '@/tests/mocks/productsMock'
import { SORTERS } from '@/utils/constants/sorters'
import { TAB_BAR_HEIGHT } from '@/utils/constants/tabBarHeight'

const SCREEN_WIDTH = Dimensions.get('screen').width
const PADDING_X = 24
const ICON_COLOR = getTokens().color.gray800.val
const ICON_SIZE = 16

type Layout = 'mosaic' | 'list'

interface ProductsListProps {
  products: Product[]
  isLoading: boolean
  setSelectedSorter: (sorter: Sorter | null) => void
  onEndReached: () => void
}

export function ProductsList({
  products,
  isLoading,
  setSelectedSorter,
  onEndReached,
}: ProductsListProps) {
  const [layout, setLayout] = useState<Layout>('mosaic')

  // console.log(products[0].skus)

  const productWidth =
    layout === 'mosaic'
      ? SCREEN_WIDTH - PADDING_X * 2
      : (SCREEN_WIDTH - PADDING_X * 2) / 2 - 12

  function handleLayoutToggle() {
    setLayout(layout === 'list' ? 'mosaic' : 'list')
  }

  function handleSelectChange(sorterName: string) {
    const sorter = SORTERS.find((sorte) => sorte.name === sorterName) ?? null
    setSelectedSorter(sorter)
  }

  return (
    <YStack pb={TAB_BAR_HEIGHT}>
      <XStack justifyContent="space-between" my={12}>
        <Select
          defaultValue="Relevância"
          items={['Relevância', ...SORTERS.map(({ name }) => name)]}
          width={132}
          onChange={handleSelectChange}
        />
        <Button
          unstyled
          icon={<ArrowsDownUp size={16} weight="bold" />}
          color="$gray800"
          fontSize={12}
          alignSelf="center"
          alignItems="center"
          flexDirection="row"
          onPress={handleLayoutToggle}
          pressStyle={{ opacity: 0.7 }}
        >
          {layout === 'mosaic' ? (
            <XStack gap={8} alignItems="center" justifyContent="center">
              <Table color={ICON_COLOR} size={ICON_SIZE} />
              <Text>Mosaico</Text>
            </XStack>
          ) : (
            <XStack gap={8} alignItems="center" justifyContent="center">
              <List color={ICON_COLOR} size={ICON_SIZE} />
              <Text>List</Text>
            </XStack>
          )}
        </Button>

        <Button
          unstyled
          icon={<ArrowsDownUp size={16} weight="bold" />}
          color="$gray800"
          fontSize={12}
          alignSelf="center"
          alignItems="center"
          flexDirection="row"
          onPress={handleLayoutToggle}
        >
          <Faders color={ICON_COLOR} size={ICON_SIZE} />
          Filtrar
        </Button>
      </XStack>

      {isLoading ? (
        <FlatList
          key="productsMock"
          data={productsMock}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <View mb={12} pl={index % 2 !== 0 ? 24 : 0}>
              <ProductItem
                data={item}
                isLoading={true}
                isColumn={layout === 'list'}
                width={productWidth}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      ) : (
        <FlatList
          key="products"
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => (
            <View mb={32} pl={index % 2 !== 0 ? 24 : 0}>
              <ProductItem
                data={item}
                isLoading={false}
                isColumn={layout === 'list'}
                width={productWidth}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          numColumns={2}
          onEndReached={onEndReached}
          ListFooterComponent={<Loading message="carregando..." />}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 4 }}
        />
      )}
    </YStack>
  )
}
