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

export function ProductItem({
  data: { skus, images, name, brand, slug, id },
  isLoading,
  isColumn = true,
  width = 150,
}: ProductItemProps) {
  return (
    <Link href={`/product/${slug}`} asChild>
      <View
        w={width}
        flexDirection={isColumn ? 'column' : 'row'}
        alignItems="center"
        gap={12}
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
            <Product.Image
              data={images.data}
              size="medium"
              width={!isColumn ? width / 2 : width}
              height={180}
            />
          </Skeleton>
        </View>
        <YStack flexShrink={1} width={!isColumn ? width / 2 : width} gap={4}>
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
                <Product.SalePrice price={skus.data[0].price_sale} />
                <Product.DiscountPrice price={skus.data[0].price_discount} />
              </>
            )}
          </XStack>
        </YStack>
      </View>
    </Link>
  )
}
