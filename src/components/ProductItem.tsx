import { memo } from 'react'
import { Link } from 'expo-router'
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

const ProductItemComponent = ({
  data: { skus, images, name, brand, slug, id, sku },
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
                  discountPrice={skus.data[0].price_discount}
                  salesPrice={skus.data[0].price_sale}
                />
              </View>
              <View position="absolute" bottom={8} right={8} zIndex={50}>
                <Product.CartButton
                  product={{ id, slug, name, skus: skus.data }}
                />
              </View>
            </>
          )}

          <Skeleton width={width} height={180} isVisible={isLoading}>
            {images.data.length > 0 && (
              <Product.Image
                data={images.data}
                size="medium"
                width={!isColumn ? width / 2 : width}
                height={180}
              />
            )}
          </Skeleton>
        </View>
        <YStack flexShrink={1} width={!isColumn ? width / 2 : width} gap={4}>
          {sku && (
            <Skeleton width={44} height={12} isVisible={isLoading}>
              <Product.SkuCode>{String(sku)}</Product.SkuCode>
            </Skeleton>
          )}
          {brand?.data.name && (
            <Skeleton width={44} height={12} isVisible={isLoading}>
              <Product.Brand>{brand.data.name}</Product.Brand>
            </Skeleton>
          )}
          <Skeleton width={80} height={24} isVisible={isLoading}>
            <Product.Name>{name}</Product.Name>
          </Skeleton>
          <XStack justifyContent="space-between">
            {!isLoading && (
              <>
                <Product.SalePrice price={skus.data[0].price_discount} />
                <Product.DiscountPrice price={skus.data[0].price_sale} />
              </>
            )}
          </XStack>
        </YStack>
      </View>
    </Link>
  )
}

export const ProductItem = memo(ProductItemComponent)
