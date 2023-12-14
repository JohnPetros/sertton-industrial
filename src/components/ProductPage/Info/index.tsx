import { XStack, YStack } from 'tamagui'

import { Sku } from '@/@types/sku'
import {
  Discount,
  DiscountPrice,
  Name,
  SalePrice,
  SkuCode,
} from '@/components/Product'
import { Skeleton } from '@/components/Skeleton'

interface InfoProps {
  productName: string
  sku: Sku | null
  isLoading: boolean
}

export function Info({ productName, sku, isLoading }: InfoProps) {
  return (
    <>
      <Skeleton isVisible={isLoading} width={120} height={24}>
        {sku && <SkuCode fontSize={14}>{sku?.sku}</SkuCode>}
      </Skeleton>
      <Skeleton isVisible={isLoading} width={300} height={48}>
        {productName && <Name fontSize={24}>{productName}</Name>}
      </Skeleton>

      <Skeleton isVisible={isLoading} width={150} height={48}>
        {sku && (
          <XStack alignItems="flex-start" gap={12}>
            <YStack>
              <SalePrice fontSize={24} price={sku?.price_sale} />
              <DiscountPrice fontSize={14} price={sku?.price_discount} />
            </YStack>
            <Discount
              salesPrice={sku?.price_sale}
              discountPrice={sku?.price_discount}
            />
          </XStack>
        )}
      </Skeleton>
    </>
  )
}
