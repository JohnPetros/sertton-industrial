import { View, XStack, YStack } from 'tamagui'

import type { Product as ProductData } from '@/@types/product'
import * as Product from '@/components/Product'
import { Skeleton } from '@/components/Skeleton'

interface ProductItemProps {
  data: ProductData
  isLoading: boolean
  isColumn?: boolean
  width: number
}

export function ProductItem({
  data: { skus, images, name },
  isLoading,
  isColumn = true,
  width = 150,
}: ProductItemProps) {
  return (
    <View
      w={width}
      flexDirection={isColumn ? 'column' : 'row'}
      alignItems="center"
      gap={12}
    >
      <View position="relative">
        {!isLoading && (
          <View position="absolute" top={8} left={8} zIndex={50}>
            <Product.Discount
              discountPrice={skus.data[0].price_discount}
              salesPrice={skus.data[0].price_sale}
            />
          </View>
        )}

        <Skeleton width={width} height={180} isVisible={!isLoading}>
          <Product.Image
            data={images.data}
            size="medium"
            width={!isColumn ? width / 2 : width}
            height={180}
          />
        </Skeleton>
      </View>
      <YStack flexShrink={1} width={!isColumn ? width / 2 : width} gap={8}>
        <Skeleton width={80} height={24} isVisible={!isLoading}>
          <Product.Name>{name}</Product.Name>
        </Skeleton>
        <XStack justifyContent="space-between">
          {!isLoading && (
            <>
              <Product.SalePrice price={skus.data[0].price_sale} />
              <Product.DiscountPrice price={skus.data[0].price_discount} />
            </>
          )}
        </XStack>
      </YStack>
    </View>
  )
}
