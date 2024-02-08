import { usePathname } from 'expo-router'
import { Trash } from 'phosphor-react-native'
import { getTokens, XStack, YStack } from 'tamagui'

import { useCartItem } from './useCartItem'

import type { Product as ProductData } from '@/@types/product'
import { Alert } from '@/components/Alert'
import { Button } from '@/components/Button'
import { NumberInput } from '@/components/Form/NumberInput'
import { List } from '@/components/List'
import * as Product from '@/components/Product'
import { Skeleton } from '@/components/shared/Skeleton'

const GAP = 12

interface CartItemProps {
  data: ProductData
  quantity: number
  selectedSkuId: string
  width: number
  isLoading: boolean
}

export function CartItem({
  data: { name, imageUrl, skus },
  quantity,
  selectedSkuId,
  width,
  isLoading,
}: CartItemProps) {
  const {
    selectedSku,
    handleQuantityChange,
    handleRemoveItem,
    handleReachMaxInStock,
  } = useCartItem(skus, selectedSkuId)
  const pathname = usePathname()

  const isSKeletonVisible = isLoading || !selectedSku

  const halfWidth = (width - GAP) / 2
  const hasVariations = Boolean(selectedSku?.variations.length)

  return (
    <XStack alignItems="center" justifyContent="center" gap={12}>
      <Skeleton width={halfWidth} height={180} isVisible={isSKeletonVisible}>
        <Product.Image
          url={imageUrl}
          size="medium"
          width={halfWidth - 24}
          height={160}
        />
      </Skeleton>

      <YStack width={halfWidth} gap={8}>
        {selectedSku && (
          <Skeleton isVisible={isSKeletonVisible}>
            <Product.SkuCode>{selectedSku.skuCode}</Product.SkuCode>
          </Skeleton>
        )}
        <Skeleton isVisible={isSKeletonVisible}>
          <Product.Name fontSize={14}>{name}</Product.Name>
        </Skeleton>

        <Skeleton isVisible={isSKeletonVisible} height={24} width={40}>
          {selectedSku && hasVariations && (
            <List
              bgColor={pathname === '/checkout' ? '$white' : '$gray50'}
              items={selectedSku.variations.map(
                (variation) => `${variation.name}: ${variation.value}`
              )}
            />
          )}
        </Skeleton>

        <Skeleton height={40} isVisible={isSKeletonVisible}>
          <NumberInput
            label={`Quantidade do produto ${name}`}
            number={quantity}
            max={selectedSku?.stock}
            onChangeNumber={handleQuantityChange}
            onReachMax={handleReachMaxInStock}
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
                <Product.DiscountPrice price={selectedSku.discountPrice} />
                <Product.SalePrice price={selectedSku.salePrice} />
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
