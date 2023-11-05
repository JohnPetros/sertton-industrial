import { FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { Button, H2, View, XStack, YStack } from 'tamagui'

import { Collection as CollectionData } from '@/@types/collection'
import * as Product from '@/components/Product'
import { Skeleton } from '@/components/Skeleton'

interface CollectionProps {
  data: CollectionData
  isLoading: boolean
}

export function Collection({
  data: { name, products },
  isLoading,
}: CollectionProps) {
  const router = useRouter()

  function handleProduct(productId: number) {
    console.log(productId)
    router.push(`/(drawer)/product/${productId}`)
  }

  return (
    <YStack>
      <Skeleton isVisible={!isLoading} mb={isLoading ? 12 : 0}>
        <H2 color="$blue500" fontSize={24} mb={12}>
          {name}
        </H2>
      </Skeleton>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Button
            unstyled
            key={item.id}
            mr={24}
            onPress={() => handleProduct(item.id)}
          >
            <YStack w={150} space={8}>
              <View position="relative">
                {!isLoading && (
                  <View position="absolute" top={8} left={8} zIndex={50}>
                    <Product.Discount
                      discountPrice={item.skus.data[0].price_discount}
                      salesPrice={item.skus.data[0].price_sale}
                    />
                  </View>
                )}

                <Skeleton width={150} height={180} isVisible={!isLoading}>
                  <Product.Image
                    data={item.images.data}
                    size="medium"
                    width={150}
                    height={180}
                  />
                </Skeleton>
              </View>
              <YStack>
                <Skeleton width={80} height={24} isVisible={!isLoading}>
                  <Product.Name>{name}</Product.Name>
                </Skeleton>
                <XStack justifyContent="space-between">
                  {!isLoading && (
                    <>
                      <Product.SalePrice price={item.skus.data[0].price_sale} />
                      <Product.DiscountPrice
                        price={item.skus.data[0].price_discount}
                      />
                    </>
                  )}
                </XStack>
              </YStack>
            </YStack>
          </Button>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </YStack>
  )
}
