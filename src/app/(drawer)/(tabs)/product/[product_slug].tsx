import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useGlobalSearchParams } from 'expo-router'
import { ScrollView, View, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { NumberInput } from '@/components/Form/NumberInput'
import { Search } from '@/components/Form/Search'
import { Header } from '@/components/Header'
import { KeyboardHandlerView } from '@/components/KeyboardHandlerView'
import { Collection } from '@/components/Marketing/Collection'
import { Description } from '@/components/ProductPage/Description'
import { Image } from '@/components/ProductPage/Image'
import { Info } from '@/components/ProductPage/Info'
import { Stock } from '@/components/ProductPage/Stock'
import { useProductPage } from '@/components/ProductPage/useProductPage'
import { ShipmentServices } from '@/components/ShipmentServices'
import { Skeleton } from '@/components/Skeleton'
import { SkuSelects } from '@/components/SkuSelects'
import { SCREEN } from '@/utils/constants/screen'

export default function ProductPage() {
  const { product_slug } = useGlobalSearchParams()
  const {
    product,
    similarProducts,
    isLoading,
    scrollRef,
    skuSelectsRef,
    selectedSku,
    hasVariations,
    quantity,
    handleAddToCart,
    handleQuantityChange,
    handleSkuChange,
  } = useProductPage(String(product_slug))
  const bottomTabBarHeight = useBottomTabBarHeight()

  return (
    <KeyboardHandlerView>
      <YStack zIndex={-100}>
        <View px={SCREEN.paddingX}>
          <Header />
          <Search />
        </View>

        <ScrollView
          ref={(ref) => (scrollRef.current = ref)}
          contentContainerStyle={{
            paddingBottom: bottomTabBarHeight * 6,
          }}
          scrollEnabled={!isLoading}
          showsVerticalScrollIndicator={false}
        >
          <Skeleton isVisible={isLoading} width={SCREEN.width} height={224}>
            {selectedSku && <Image data={selectedSku.images.data} />}
          </Skeleton>
          <YStack px={SCREEN.paddingX} mt={12} gap={8}>
            <Info
              productName={product?.name ?? ''}
              sku={selectedSku}
              isLoading={isLoading}
            />
            <YStack
              mt={hasVariations ? 12 : 0}
              gap={32}
              alignItems="flex-start"
            >
              <View position="relative">
                <View position="absolute" zIndex={50}>
                  <Skeleton
                    isVisible={isLoading}
                    width={SCREEN.width - SCREEN.paddingX}
                    height={70}
                  >
                    <></>
                  </Skeleton>
                </View>
                {product && (
                  <SkuSelects
                    ref={skuSelectsRef}
                    isDisabled={isLoading}
                    productId={product.id}
                    onSkuChange={handleSkuChange}
                  />
                )}
              </View>

              <Skeleton isVisible={isLoading} height={40}>
                {product && (
                  <NumberInput
                    label={`Quantidade do produto ${product.name}`}
                    number={quantity}
                    onChangeNumber={handleQuantityChange}
                  />
                )}
              </Skeleton>

              <Skeleton isVisible={isLoading} height={40}>
                {selectedSku && <Stock sku={selectedSku} />}
              </Skeleton>

              {isLoading ? (
                <Skeleton
                  isVisible={isLoading}
                  width={SCREEN.width}
                  height={40}
                >
                  <></>
                </Skeleton>
              ) : (
                <Button w="100%" onPress={handleAddToCart}>
                  Adicionar ao carinho
                </Button>
              )}
            </YStack>

            {selectedSku && product && (
              <View mt={24}>
                <Skeleton
                  isVisible={isLoading}
                  width={SCREEN.width - 48}
                  height={40}
                >
                  <ShipmentServices
                    product={{
                      ...selectedSku,
                      quantity,
                    }}
                  />
                </Skeleton>
              </View>
            )}

            {product && !isLoading && (
              <YStack mt={24} gap={24}>
                <Description
                  description={product.texts.data.description}
                  specifications={product.texts.data.specifications}
                />
                <YStack>
                  {similarProducts && (
                    <Collection
                      data={{
                        id: 9999,
                        name: 'Produtos relacionados',
                        products: similarProducts ?? [],
                      }}
                      isLoading={false}
                    />
                  )}
                </YStack>
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </YStack>
      {/* {!isSkeletonVisible && selectedSku && (
        <BottomCartButton
          onPress={handleAddToCart}
          priceSale={selectedSku?.price_sale}
          priceDiscount={selectedSku?.price_discount}
        />
      )} */}
    </KeyboardHandlerView>
  )
}
