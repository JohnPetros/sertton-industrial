import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, View as ListContainer } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { FlashList } from '@shopify/flash-list'
import {
  ArrowsDownUp,
  Faders,
  List,
  MagnifyingGlass,
  Table,
} from 'phosphor-react-native'
import { Button, getTokens, Text, View, XStack, YStack } from 'tamagui'

import type { Product } from '@/@types/product'
import type { Sorter } from '@/@types/sorter'
import { EmptyItemsMessage } from '@/components/EmptyItemsMessage'
import { FiltersDialog } from '@/components/FiltersDialog'
import { Loading } from '@/components/Loading'
import { ProductItem } from '@/components/ProductItem'
import { Select } from '@/components/Select'
import { productsMock } from '@/tests/mocks/productsMock'
import { SCREEN } from '@/utils/constants/screen'
import { SORTERS } from '@/utils/constants/sorters'

const ICON_COLOR = getTokens().color.gray800.val
const ICON_SIZE = 16

const PRODUCT_ITEM_HEIGHT = 180
const LIST_GAP_BETWEEN_ITEMS = 12

type Layout = 'mosaic' | 'list'

interface ProductsListProps {
  products: Product[]
  isLoading: boolean
  hasNextPage: boolean
  setSelectedSorter: (sorter: Sorter | null) => void
  onEndReached: () => void
}

export function ProductsList({
  products,
  isLoading,
  hasNextPage,
  setSelectedSorter,
  onEndReached,
}: ProductsListProps) {
  const [layout, setLayout] = useState<Layout>('list')
  const isFetching = useRef(false)
  const totalProducts = useRef(0)
  const bottomTabBarHeight = useBottomTabBarHeight()

  console.log({ hasNextPage })

  const productWidth =
    layout === 'list'
      ? SCREEN.width - SCREEN.paddingX * 2
      : (SCREEN.width - SCREEN.paddingX * 2) / 2 - 12

  const renderItem = useCallback(
    ({ item, index }: { item: Product; index: number }) => {
      return (
        <View mb={32} pl={layout === 'mosaic' && index % 2 !== 0 ? 24 : 0}>
          <ProductItem
            data={item}
            isLoading={false}
            isColumn={layout === 'mosaic'}
            width={productWidth}
          />
        </View>
      )
    },
    [layout]
  )

  function handleLayoutToggle() {
    setLayout(layout === 'list' ? 'mosaic' : 'list')
  }

  function handleSelectChange(sorterName: string) {
    const sorter = SORTERS.find((sorte) => sorte.name === sorterName) ?? null
    setSelectedSorter(sorter)
  }

  function handleListEndReached() {
    if (!isFetching.current) {
      isFetching.current = true
      onEndReached()
    }
  }

  useEffect(() => {
    if (products.length > totalProducts.current) {
      totalProducts.current = products.length
      isFetching.current = false
    }
  }, [products])

  return (
    <YStack pb={bottomTabBarHeight}>
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

        <FiltersDialog>
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
                isColumn={layout === 'mosaic'}
                width={productWidth}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      ) : (
        <ListContainer style={{ height: 1000 }}>
          <FlashList
            data={products}
            keyExtractor={(item) => String(item.id)}
            extraData={layout}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.6}
            numColumns={layout === 'mosaic' ? 2 : 1}
            onEndReached={handleListEndReached}
            estimatedItemSize={PRODUCT_ITEM_HEIGHT + LIST_GAP_BETWEEN_ITEMS}
            ListFooterComponent={
              <View mt={-64}>
                <Loading size={150} message="carregando mais produtos..." />
              </View>
            }
            ListEmptyComponent={
              <View h={SCREEN.height / 2}>
                <EmptyItemsMessage
                  title="Oh não..."
                  subtitle="Nenhum produto foi encontrado"
                  icon={MagnifyingGlass}
                />
              </View>
            }
            contentContainerStyle={{
              paddingBottom: bottomTabBarHeight * 4 + 200,
            }}
          />
        </ListContainer>
      )}
    </YStack>
  )
}
