import { useState } from 'react'
import { FlatList } from 'react-native'
import { CaretDown } from 'phosphor-react-native'
import { getTokens, H2, View, YStack } from 'tamagui'
import { XStack } from 'tamagui'

import { Accordion } from '@/components/Accordion'
import { Button } from '@/components/Button'
import { CartSummary } from '@/components/CartSummary'
import { ProductCartItem } from '@/components/ProductCartItem'
import { Skeleton } from '@/components/Skeleton'
import { useCart } from '@/hooks/useCart'
import { cartItemsMock } from '@/tests/mocks/cartItemsMock'
import { SCREEN } from '@/utils/constants/screen'

const PADDING = 12
const PRODUCT_CART_ITEM_WIDTH = SCREEN.width - SCREEN.paddingX * 2 - PADDING * 2

export function CartItems() {
  const { products, isLoading, totalCartItems } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  function handleOpen() {
    setIsOpen(!isOpen)
  }

  return (
    <Accordion
      label={
        <XStack justifyContent="space-between">
          <H2 fontSize={14} color="$gray900" fontWeight="600">
            Resumo da compra
          </H2>
          <Button
            onPress={handleOpen}
            background="transparent"
            icon={<CaretDown color={getTokens().color.gray400.val} size={24} />}
          />
        </XStack>
      }
    >
      {isOpen && (
        <YStack h={650}>
          {isLoading ? (
            <FlatList
              key="cart-items-loading"
              data={cartItemsMock.slice(0, totalCartItems)}
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
                    quantity={item.quantity}
                    selectedSkuId={item.selectedSkuId}
                    width={PRODUCT_CART_ITEM_WIDTH}
                    isLoading={false}
                  />
                </View>
              )}
            />
          )}

          {products && (
            <YStack p={12} borderRadius={4} gap={12} bg="$gray50" mt={12}>
              <Skeleton
                isVisible={isLoading}
                height={120}
                width={PRODUCT_CART_ITEM_WIDTH - PADDING * 2}
              >
                <CartSummary items={products} />
              </Skeleton>
            </YStack>
          )}
        </YStack>
      )}
    </Accordion>
  )
}
