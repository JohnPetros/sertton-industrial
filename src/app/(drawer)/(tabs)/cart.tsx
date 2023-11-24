import { FlatList } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { Link } from 'expo-router'
import { ShoppingCart, TrashSimple } from 'phosphor-react-native'
import { getTokens, H1, View, XStack, YStack } from 'tamagui'

import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { CartSummary } from '@/components/CartSummary'
import { EmptyItemsMessage } from '@/components/EmptyItemsMessage'
import { Header } from '@/components/Header'
import { ProductCartItem } from '@/components/ProductCartItem'
import { useCart } from '@/hooks/useCart'
import { useCartStore } from '@/stores/cartStore'
import { cartItemsMock } from '@/tests/mocks/cartItemsMock'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'

const PRODUCT_CART_ITEM_WIDTH = SCREEN.width - SCREEN.paddingX * 2

export default function Cart() {
  const removeAllItems = useCartStore((store) => store.actions.removeAllItems)
  const { products, isLoading, totalCartItems } = useCart()
  const isCartEmpty = totalCartItems <= 0

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
          <FlashList
            key="cart-items-loading"
            data={cartItemsMock.slice(0, totalCartItems)}
            estimatedItemSize={200}
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
          <>
            <FlatList
              key="cart-items"
              data={products}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <View mb={32}>
                  <ProductCartItem
                    data={item}
                    quantity={item.quantity}
                    selectedSkuId={item.selectedSkuId}
                    width={PRODUCT_CART_ITEM_WIDTH}
                    isLoading={false}
                  />
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 180 }}
            />
            {products && (
              <YStack
                zIndex={50}
                position="absolute"
                bottom={0}
                py={12}
                gap={8}
                bg="$gray50"
                w="100%"
              >
                <CartSummary items={products} />
                <Link href={ROUTES.checkout} style={{ width: '100%' }}>
                  <Button w={SCREEN.width - SCREEN.paddingX * 2}>
                    Finalizar compra
                  </Button>
                </Link>
              </YStack>
            )}
          </>
        )}
      </View>
    </YStack>
  )
}
