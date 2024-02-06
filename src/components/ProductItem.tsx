import { memo } from 'react'
import { Link } from 'expo-router'
import { View, XStack, YStack } from 'tamagui'

import type { Product as ProductData } from '@/@types/product'
import * as Product from '@/components/Product'
import { Skeleton } from '@/components/Skeleton'

type ProductItemProps = {
  data: ProductData
  isLoading: boolean
  isColumn?: boolean
  width: number
}

const ProductItemComponent = ({
  data: { skus, images, name, brand, slug, id, skuCode },
  isLoading,
  isColumn = true,
  width = 150,
}: ProductItemProps) => {
  return (
    <Link href={`/product/${slug}`} asChild>
      <View
        w={width}
        flexDirection={isColumn ? 'column' : 'row'}
        alignItems="center"
        gap={12}
        pressStyle={{ backgroundColor: '$gray100' }}
      >
        <View position="relative">
          {!isLoading && (
            <>
              <View position="absolute" top={8} left={8} zIndex={50}>
                <Product.Discount
                  discountPrice={skus[0].discountPrice}
                  salesPrice={skus[0].salePrice}
                />
              </View>
              <View position="absolute" bottom={8} right={8} zIndex={50}>
                <Product.CartButton product={{ id, slug, name, skus }} />
              </View>
            </>
          )}

          <Skeleton width={width} height={180} isVisible={isLoading}>
            {images.length > 0 && (
              <Product.Image
                url={images[0].url}
                size="medium"
                width={!isColumn ? width / 2 : width}
                height={180}
              />
            )}
          </Skeleton>
        </View>
        <YStack flexShrink={1} width={!isColumn ? width / 2 : width} gap={4}>
          {brand?.name && (
            <Skeleton width={44} height={12} isVisible={isLoading}>
              <Product.Brand>{brand.name}</Product.Brand>
            </Skeleton>
          )}
          <Skeleton width={80} height={24} isVisible={isLoading}>
            <Product.Name>{name}</Product.Name>
          </Skeleton>
          <XStack justifyContent="space-between">
            {!isLoading && (
              <>
                <Product.SalePrice price={skus[0].discountPrice} />
                <Product.DiscountPrice price={skus[0].salePrice} />
              </>
            )}
          </XStack>
        </YStack>
      </View>
    </Link>
  )
}

export const ProductItem = memo(ProductItemComponent)
