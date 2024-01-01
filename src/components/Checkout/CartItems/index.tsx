import { FlatList } from 'react-native'
import { H2, View, YStack } from 'tamagui'
import { XStack } from 'tamagui'

import { CartItem } from './CartItem'

import { cartItemsMock } from '@/_tests_/mocks/cartItemsMock'
import { Accordion } from '@/components/Accordion'
import { CartSummary } from '@/components/CartSummary'
import { Skeleton } from '@/components/Skeleton'
import { useCart } from '@/hooks/useCart'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

const PADDING = 12
const CART_ITEM_WIDTH = SCREEN.width - SCREEN.paddingX * 2 - PADDING * 2

export function CartItems() {
  const { products, isLoading, isFetching, totalCartItems } = useCart()
  const shipmentPrice = useCheckoutStore(
    ({ state }) => state.shipmentService?.price
  )

  return (
    <Accordion
      label={
        <XStack justifyContent="space-between">
          <H2 fontSize={14} color="$gray900" fontWeight="600">
            Resumo da compra
          </H2>
        </XStack>
      }
    >
      <YStack>
        {isLoading || isFetching ? (
          <FlatList
            key="cart-items-loading"
            data={cartItemsMock.slice(0, totalCartItems)}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View mb={32}>
                <CartItem
                  data={item}
                  quantity={item.quantity}
                  selectedSkuId={item.selectedSkuId}
                  width={CART_ITEM_WIDTH}
                  isLoading={true}
                />
              </View>
            )}
          />
        ) : (
          <FlatList
            key="cart-items"
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View mb={32}>
                <CartItem
                  data={item}
                  quantity={item.quantity}
                  selectedSkuId={item.selectedSkuId}
                  width={CART_ITEM_WIDTH}
                  isLoading={false}
                />
              </View>
            )}
          />
        )}

        <YStack p={12} borderRadius={4} gap={12} bg="$gray50" mt={12}>
          <Skeleton
            isVisible={isLoading}
            height={120}
            width={CART_ITEM_WIDTH - PADDING * 2}
          >
            <CartSummary items={products ?? []} shipment={shipmentPrice ?? 0} />
          </Skeleton>
        </YStack>
      </YStack>
    </Accordion>
  )
}
