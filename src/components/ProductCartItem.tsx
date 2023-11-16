import { useEffect, useState } from 'react'
import { Trash } from 'phosphor-react-native'
import { getTokens, XStack, YStack } from 'tamagui'

import type { Product as ProductData } from '@/@types/product'
import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { NumberInput } from '@/components/NumberInput'
import * as Product from '@/components/Product'
import { Skeleton } from '@/components/Skeleton'
import { useCartStore } from '@/stores/cartStore'

interface ProductCartItemProps {
  data: ProductData
  quantity: number
  selectedSkuId: number
  width: number
  isLoading: boolean
}

export function ProductCartItem({
  data: { name, images, skus },
  quantity,
  selectedSkuId,
  width,
  isLoading,
}: ProductCartItemProps) {
  const [quantityValue, setQuantityValue] = useState(quantity)
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)

  const { removeItem, setItemQuantity } = useCartStore((store) => store.actions)

  const halfWidth = (width - 12) / 2

  function handleRemoveItem() {
    if (selectedSku) removeItem(selectedSku.id)
  }

  function handleQuantityChange(quantity: number) {
    setQuantityValue(quantity)

    if (selectedSku) setItemQuantity(selectedSku.id, quantity)
  }

  function selectSku() {
    const selectedSku = skus.data.find((sku) => sku.id === selectedSkuId)

    if (selectedSku) setSelectedSku(selectedSku)
  }

  useEffect(() => {
    selectSku()
  }, [])

  return (
    <XStack alignItems="center" justifyContent="center" gap={12}>
      <Skeleton width={halfWidth} height={180} isVisible={isLoading}>
        <Product.Image
          data={images.data}
          size="medium"
          width={halfWidth}
          height={180}
        />
      </Skeleton>

      <YStack width={halfWidth} gap={8}>
        {selectedSku && (
          <Skeleton isVisible={isLoading}>
            <Product.SkuCode>{selectedSku.sku}</Product.SkuCode>
          </Skeleton>
        )}
        <Skeleton isVisible={isLoading}>
          <Product.Name>{name}</Product.Name>
        </Skeleton>

        <Skeleton height={40} isVisible={isLoading}>
          <NumberInput
            label="Quantidade do produto"
            number={quantityValue}
            onChangeNumber={handleQuantityChange}
          />
        </Skeleton>

        <Skeleton height={40} isVisible={isLoading}>
          <XStack
            w={halfWidth}
            alignItems="center"
            justifyContent="space-between"
          >
            {selectedSku && (
              <YStack>
                <Product.SalePrice price={selectedSku.price_sale} />
                <Product.DiscountPrice price={selectedSku.price_discount} />
              </YStack>
            )}
            <Button
              background="secondary"
              w={24}
              h={24}
              onPress={handleRemoveItem}
            >
              <Trash size={16} color={getTokens().color.white.val} />
            </Button>
          </XStack>
        </Skeleton>
      </YStack>
    </XStack>
  )
}
