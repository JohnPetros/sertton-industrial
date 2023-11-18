import { useState } from 'react'
import { FlatList } from 'react-native'
import { ArrowsDownUp, Faders, List, Table } from 'phosphor-react-native'
import { Button, getTokens, Text, View, XStack, YStack } from 'tamagui'

import type { Product } from '@/@types/product'
import type { Sorter } from '@/@types/sorter'
import { FiltersDialog } from '@/components/FiltersDialog'
import { Loading } from '@/components/Loading'
import { ProductItem } from '@/components/ProductItem'
import { Select } from '@/components/Select'
import useBrands from '@/hooks/useBrands'
import { productsMock } from '@/tests/mocks/productsMock'
import { SCREEN } from '@/utils/constants/screen'
import { SORTERS } from '@/utils/constants/sorters'
import { TAB_BAR_HEIGHT } from '@/utils/constants/tabBarHeight'

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
  const { brands } = useBrands()

  const productWidth =
    layout === 'mosaic'
      ? SCREEN.width - SCREEN.paddingX * 2
      : (SCREEN.width - SCREEN.paddingX * 2) / 2 - 12

  function handleLayoutToggle() {
    setLayout(layout === 'list' ? 'mosaic' : 'list')
  }

  function handleSelectChange(sorterName: string) {
    const sorter = SORTERS.find((sorte) => sorte.name === sorterName) ?? null
    setSelectedSorter(sorter)
  }

  return (
    <YStack pb={TAB_BAR_HEIGHT * 4}>
      <XStack justifyContent="space-between" my={12}>
        <Select
          ariaLabel="Ordenar produtos por"
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

        <FiltersDialog brands={brands ?? []}>
          <Button
            unstyled
            icon={<ArrowsDownUp size={16} weight="bold" />}
            color="$gray800"
            fontSize={12}
            alignSelf="center"
            alignItems="center"
            flexDirection="row"
          >
            <Faders color={ICON_COLOR} size={ICON_SIZE} />
            Filtrar
          </Button>
        </FiltersDialog>
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
          ListFooterComponent={<Loading size={200} message="carregando..." />}
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 4 }}
        />
      )}
    </YStack>
  )
}
