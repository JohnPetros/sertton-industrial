import { Dimensions, FlatList } from 'react-native'
import { TrashSimple } from 'phosphor-react-native'
import { getTokens, H1, View, XStack, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ProductCartItem } from '@/components/ProductCartItem'
import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/stores/cartStore'

const SCREEN_WIDTH = Dimensions.get('screen').width
const PADDING_X = 24
const PRODUCT_CART_ITEM_WIDTH = SCREEN_WIDTH - PADDING_X * 2

export default function Cart() {
  const items = useCartStore((store) => store.state.items)
  const { products, isLoading } = useCart(items)

  return (
    <YStack px={24}>
      <Header />
      <XStack mt={12} alignItems="center" justifyContent="space-between">
        <H1 fontSize={24}>Meu Carrinho</H1>
        <Button background="transparent" mr={-12}>
          <TrashSimple color={getTokens().color.gray400.val} weight="bold" />
          Limpar carrinho
        </Button>
      </XStack>

      <FlatList
        key="cart-products"
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View mb={32}>
            <ProductCartItem
              data={item}
              quantity={item.quantinty}
              selectedSkuId={item.selectedSkuId}
              width={PRODUCT_CART_ITEM_WIDTH}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  )
}
