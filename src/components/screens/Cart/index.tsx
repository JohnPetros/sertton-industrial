import { FlatList } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { ShoppingCart, TrashSimple } from 'phosphor-react-native'
import { getTokens, H1, View, XStack, YStack } from 'tamagui'

import { PRODUCT_CART_ITEM_WIDTH } from './constants/product-cart-item-width'

import { computedProductsMock } from '@/_tests_/mocks/computedProductsMock'
import { Alert } from '@/components/shared/Alert'
import { Button } from '@/components/shared/Button'
import { CartItem } from '@/components/shared/CartItems/CartItem'
import { CartSummary } from '@/components/shared/CartSummary'
import { EmptyItemsMessage } from '@/components/shared/EmptyItemsMessage'
import { Header } from '@/components/shared/Header'
import { Skeleton } from '@/components/shared/Skeleton'
import { useCart } from '@/hooks/useCart'
import { SCREEN } from '@/utils/constants/screen'

export function Cart() {
  const {
    products,
    isLoading,
    totalCartItems,
    isFetching,
    handleRemoveAllItems,
    redirectToCheckout,
  } = useCart()
  const isCartEmpty = totalCartItems <= 0
  const productsMock = computedProductsMock.slice(0, totalCartItems)

  return (
    <YStack px={SCREEN.paddingX} flex={1}>
      <Header />
      <XStack mt={8} alignItems="center" justifyContent="space-between">
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

      <View flex={1} mt={12}>
        {isCartEmpty ? (
          <EmptyItemsMessage
            title="Seu carrinho está vazio"
            subtitle="Navegue pela loja e adiciona produtos."
            icon={ShoppingCart}
            callback={<Button>Procurar produtos</Button>}
          />
        ) : isLoading || isFetching ? (
          <FlatList
            key="cart-items-loading"
            data={productsMock}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View mb={32}>
                <CartItem
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
            <FlashList
              key="cart-items"
              data={products}
              keyExtractor={(item) => String(item.id)}
              estimatedItemSize={200}
              renderItem={({ item }) => (
                <View mb={32}>
                  <CartItem
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
            <YStack
              zIndex={50}
              position="absolute"
              bottom={0}
              py={12}
              bg="$gray50"
              w="100%"
            >
              <Skeleton
                width={SCREEN.width - SCREEN.paddingX * 2}
                height={180}
                isVisible={false}
              >
                <YStack gap={8}>
                  {products && <CartSummary items={products} />}

                  <Button
                    onPress={redirectToCheckout}
                    w={SCREEN.width - SCREEN.paddingX * 2}
                  >
                    Finalizar compra
                  </Button>
                </YStack>
              </Skeleton>
            </YStack>
          </>
        )}
      </View>
    </YStack>
  )
}
