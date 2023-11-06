import { useState } from 'react'
import { Dimensions, FlatList } from 'react-native'
import { ArrowsDownUp } from 'phosphor-react-native'
import { View, XStack, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ProductItem } from '@/components/ProductItem'
import { Search } from '@/components/Search'
import { Select } from '@/components/Select'
import { useProducts } from '@/hooks/useProducts'

const SCREEN_WIDTH = Dimensions.get('screen').width
const PADDING_X = 24

export default function Products() {
  const { products, error, isLoading } = useProducts()
  const [isMosaic, setIsMosaic] = useState(false)

  return (
    <YStack px={PADDING_X}>
      <Header />
      <Search />

      {/* <H2 fontSize={16} color="$gray300">
        500 produtos encontrados
      </H2> */}

      <XStack justifyContent="space-between" my={24}>
        <Select defaultValue="A-Z" items={['A-Z', 'Z-A']} width={90} />
        <Button
          background="transparent"
          icon={<ArrowsDownUp size={16} weight="bold" />}
          color="$gray800"
          fontSize={12}
        >
          Mais vendidos
        </Button>
      </XStack>

      {products?.length && (
        <FlatList
          data={products}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View mb={12}>
              <ProductItem
                data={item}
                isLoading={isLoading}
                isColumn={isMosaic}
                width={SCREEN_WIDTH - PADDING_X * 2}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </YStack>
  )
}
