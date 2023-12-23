import { useEffect, useState } from 'react'
import { Trash } from 'phosphor-react-native'
import { getTokens, XStack, YStack } from 'tamagui'

import type { Product as ProductData } from '@/@types/product'
import type { Sku } from '@/@types/sku'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { List } from '@/components/List'
import { NumberInput } from '@/components/NumberInput'
import * as Product from '@/components/Product'
import { Skeleton } from '@/components/Skeleton'
import { useCartStore } from '@/stores/cartStore'

const GAP = 12

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
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)

  const removeItem = useCartStore((store) => store.actions.removeItem)
  const setItemQuantity = useCartStore((store) => store.actions.setItemQuantity)

  const isSKeletonVisible = isLoading || !selectedSku

  const halfWidth = (width - GAP) / 2
  const hasVariations = Boolean(selectedSku?.variations.length)

  function handleQuantityChange(newQuantity: number) {
    if (selectedSku) setItemQuantity(selectedSku.id, newQuantity)
  }

  function handleRemoveItem() {
    if (selectedSku) removeItem(selectedSku.id)
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
      <Skeleton width={halfWidth} height={180} isVisible={isSKeletonVisible}>
        <Product.Image
          data={images.data}
          size="medium"
          width={halfWidth - 24}
          height={160}
        />
      </Skeleton>

      <YStack width={halfWidth} gap={8}>
        {selectedSku && (
          <Skeleton isVisible={isSKeletonVisible}>
            <Product.SkuCode>{selectedSku.sku}</Product.SkuCode>
          </Skeleton>
        )}
        <Skeleton isVisible={isSKeletonVisible}>
          <Product.Name fontSize={14}>{name}</Product.Name>
        </Skeleton>

        <Skeleton isVisible={isSKeletonVisible} height={24} width={40}>
          {selectedSku && hasVariations && (
            <List
              items={selectedSku.variations.map(
                (variation) => `${variation.name}: ${variation.value}`
              )}
            />
          )}
        </Skeleton>

        <Skeleton height={40} isVisible={isSKeletonVisible}>
          <NumberInput
            label="Quantidade do produto"
            number={quantity}
            onChangeNumber={handleQuantityChange}
          />
        </Skeleton>

        <Skeleton height={40} isVisible={isSKeletonVisible}>
          <XStack
            w={halfWidth}
            alignItems="center"
            justifyContent="space-between"
          >
            {selectedSku && (
              <YStack>
                <Product.DiscountPrice price={selectedSku.price_sale} />
                <Product.SalePrice price={selectedSku.price_discount} />
              </YStack>
            )}
            <Alert
              title="Deseja mesmo remover esse item do carrinho?"
              onConfirm={handleRemoveItem}
            >
              <Button background="secondary" w={24} h={24}>
                <Trash size={16} color={getTokens().color.white.val} />
              </Button>
            </Alert>
          </XStack>
        </Skeleton>
      </YStack>
    </XStack>
  )
}
