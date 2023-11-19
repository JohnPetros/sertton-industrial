import { Dimensions, FlatList } from 'react-native'
import { ShoppingCart, TrashSimple } from 'phosphor-react-native'
import { getTokens, H1, View, XStack, YStack } from 'tamagui'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { EmptyItemsMessage } from '@/components/EmptyItemsMessage'
import { Header } from '@/components/Header'
import { ProductCartItem } from '@/components/ProductCartItem'
import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/stores/cartStore'
import { cartItemsMock } from '@/tests/mocks/cartItemsMock'

const SCREEN_WIDTH = Dimensions.get('screen').width
const PADDING_X = 24
const PRODUCT_CART_ITEM_WIDTH = SCREEN_WIDTH - PADDING_X * 2

export default function Cart() {
  const items = useCartStore((store) => store.state.items)
  const removeAllItems = useCartStore((store) => store.actions.removeAllItems)
  const { products, isLoading } = useCart(items)
  const isCartEmpty = items.length <= 0

  function handleRemoveAllItems() {
    removeAllItems()
  }

  return (
    <YStack px={24} flex={1}>
      <Header />
      <XStack mt={12} alignItems="center" justifyContent="space-between">
        <H1 fontSize={24}>Meu Carrinho</H1>
        {!isCartEmpty && (
          <Alert
            title="Deseja realmente limpar o carrinho?"
            onConfirm={handleRemoveAllItems}
          >
            <Button background="transparent" mr={-12}>
              <TrashSimple
                color={getTokens().color.gray400.val}
                weight="bold"
              />
              Limpar carrinho
            </Button>
          </Alert>
        )}
      </XStack>

      <View flex={1} mt={24}>
        {isCartEmpty ? (
          <EmptyItemsMessage
            title="Seu carrinho está vazio"
            subtitle="Navegue pela loja e adiciona produtos."
            icon={ShoppingCart}
            callback={<Button>Procurar produtos</Button>}
          />
        ) : isLoading ? (
          <FlatList
            key="cart-items-loading"
            data={cartItemsMock.slice(0, items.length)}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View mb={32}>
                <ProductCartItem
                  data={item}
                  quantity={item.quantity}
                  selectedSkuId={item.selectedSkuId}
                  width={PRODUCT_CART_ITEM_WIDTH}
                  isLoading={true}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            key="cart-items"
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View mb={32}>
                <ProductCartItem
                  data={item}
                  quantity={item.quantinty}
                  selectedSkuId={item.selectedSkuId}
                  width={PRODUCT_CART_ITEM_WIDTH}
                  isLoading={false}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </YStack>
  )
}
