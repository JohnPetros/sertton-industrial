import { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect, useRouter } from 'expo-router'
import { useGlobalSearchParams } from 'expo-router/src/hooks'
import { ArrowsOut, ChatCenteredText, Question } from 'phosphor-react-native'
import {
  getTokens,
  H2,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
} from 'tamagui'
import { Text } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { Collection } from '@/components/Collection'
import { Search } from '@/components/Form/Search'
import { FullImage, FullImageRef } from '@/components/FullImage'
import { Header } from '@/components/Header'
import { KeyboardHandlerView } from '@/components/KeyboardHandlerView'
import { List } from '@/components/List'
import { NumberInput } from '@/components/NumberInput'
import {
  Discount,
  DiscountPrice,
  Image,
  Name,
  SalePrice,
  SkuCode,
} from '@/components/Product'
import { ProductReviews } from '@/components/ProductReviews'
import ShippingCostsCalculation from '@/components/ShippingCostsCalculation'
import { Skeleton } from '@/components/Skeleton'
import { SkuSelects, SkuSelectsRef } from '@/components/SkuSelects'
import { Tabs } from '@/components/Tabs'
import { Timer } from '@/components/Timer'
import { useProduct } from '@/hooks/useProduct'
import { useProductReviews } from '@/hooks/useProductReviews'
import { useDate } from '@/services/date'
import { useCartStore } from '@/stores/cartStore'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'
import { getItemsFromHTMLList } from '@/utils/helpers/getItemsFromHTMLList'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export default function Product() {
  const { product_slug } = useGlobalSearchParams()
  const { product, similarProducts } = useProduct(String(product_slug))
  const productId = useRef(0)
  const { reviews } = useProductReviews(productId.current)

  const addItem = useCartStore((store) => store.actions.addItem)

  const [isLoading, setIsLoading] = useState(true)
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const skuSelectsRef = useRef<SkuSelectsRef | null>(null)
  const fullImageRef = useRef<FullImageRef | null>(null)
  const scrollRef = useRef<ScrollView | null>(null)
  const quantity = useRef(1)
  const bottomTabBarHeight = useBottomTabBarHeight()

  const router = useRouter()
  const { calculateTimeUtilTodayEnd } = useDate()
  const timeUtilTodayEnd = calculateTimeUtilTodayEnd()

  const hasVariations = Boolean(
    skuSelectsRef.current?.selectedSku?.variations.length
  )

  function handleSkuChange(sku: Sku) {
    setSelectedSku(sku)
  }

  function handleQuantityChange(newQuantity: number) {
    quantity.current = newQuantity
  }

  function handleFullImage() {
    fullImageRef.current?.open()
  }

  function handleAddToCart() {
    const shouldAddTocart = skuSelectsRef.current?.onAddSkuToCart()

    console.log({ canAddItem: hasVariations && !shouldAddTocart })

    if (hasVariations && !shouldAddTocart) return

    if (product && selectedSku) {
      addItem({
        slug: product.slug,
        skuId: selectedSku.id,
        quantity: quantity.current,
      })
      router.push(ROUTES.cart)
    }
  }

  function handleCartButtonLayout({ nativeEvent }: LayoutChangeEvent) {
    const { x, y, width, height } = nativeEvent.layout
  }

  useEffect(() => {
    if (selectedSku) setIsLoading(false)
  }, [selectedSku])

  useFocusEffect(
    useCallback(() => {
      if (product) productId.current = product.id

      return () => {
        console.log(quantity.current)

        setIsLoading(true)
        setSelectedSku(null)
        scrollRef.current?.scrollTo({ y: 0 })
        productId.current = 0
        quantity.current = 0
      }
    }, [product])
  )

  return (
    <KeyboardHandlerView>
      {selectedSku && !isLoading && (
        <FullImage ref={fullImageRef} data={selectedSku.images.data} />
      )}
      <YStack zIndex={-100}>
        <View px={SCREEN.paddingX}>
          <Header />
          <Search />
        </View>

        <ScrollView
          ref={(ref) => (scrollRef.current = ref)}
          contentContainerStyle={{
            paddingBottom: bottomTabBarHeight * 8,
          }}
          scrollEnabled={!isLoading}
        >
          <Skeleton isVisible={isLoading} width={SCREEN.width} height={224}>
            <View
              position="relative"
              mt={24}
              onStartShouldSetResponder={() => {
                handleFullImage()
                return true
              }}
            >
              {selectedSku && (
                <Image
                  data={selectedSku?.images.data}
                  size="large"
                  width={SCREEN.width}
                  height={224}
                />
              )}

              <Button
                position="absolute"
                zIndex={50}
                background="transparent"
                fontSize={12}
              >
                <ArrowsOut size={16} color={getTokens().color.gray800.val} />
                Pressione para zoom
              </Button>
            </View>
          </Skeleton>
          <YStack px={SCREEN.paddingX} mt={12} gap={8}>
            <>
              <Skeleton isVisible={isLoading} width={120} height={24}>
                {selectedSku && (
                  <SkuCode fontSize={14}>{selectedSku?.sku}</SkuCode>
                )}
              </Skeleton>
              <Skeleton isVisible={isLoading} width={300} height={48}>
                {selectedSku && (
                  <Name fontSize={24}>{String(product?.name)}</Name>
                )}
              </Skeleton>

              <Skeleton isVisible={isLoading} width={150} height={48}>
                {selectedSku && (
                  <XStack alignItems="flex-start" gap={12}>
                    <YStack>
                      <SalePrice
                        fontSize={24}
                        price={selectedSku?.price_sale}
                      />
                      <DiscountPrice
                        fontSize={14}
                        price={selectedSku?.price_discount}
                      />
                    </YStack>
                    <Discount
                      salesPrice={selectedSku?.price_sale}
                      discountPrice={selectedSku?.price_discount}
                    />
                  </XStack>
                )}
              </Skeleton>
            </>
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
                    productId={productId.current}
                    onSkuChange={handleSkuChange}
                  />
                )}
              </View>

              <Skeleton isVisible={isLoading} height={40}>
                {product && (
                  <NumberInput
                    label={`Quantidade do produto ${product.name}`}
                    number={quantity.current}
                    onChangeNumber={handleQuantityChange}
                  />
                )}
              </Skeleton>

              <Skeleton isVisible={isLoading} height={40}>
                {selectedSku && (
                  <YStack gap={12}>
                    <XStack gap={4}>
                      <Text color="$gray800">Apenas</Text>
                      <View
                        borderRadius={12}
                        bg="$blue500"
                        alignItems="center"
                        justifyContent="center"
                        w={24}
                        h={24}
                      >
                        <Text color="$white" fontWeight="600" fontSize={12}>
                          {selectedSku.total_in_stock}
                        </Text>
                      </View>
                      <Text color="$gray800">produtos em estoque</Text>
                    </XStack>
                    <XStack alignItems="center">
                      <Text color="$gray600">A oferta acaba em </Text>
                      <Timer
                        initialHours={timeUtilTodayEnd.hours}
                        initialMinutes={timeUtilTodayEnd.minutes}
                        initialSeconds={timeUtilTodayEnd.seconds}
                      />
                    </XStack>
                  </YStack>
                )}
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
                <Button
                  onLayout={handleCartButtonLayout}
                  w="100%"
                  onPress={handleAddToCart}
                >
                  Adicionar ao carinho
                </Button>
              )}
            </YStack>

            {selectedSku && (
              <View mt={24}>
                <Skeleton
                  isVisible={isLoading}
                  width={SCREEN.width - 48}
                  height={40}
                >
                  <ShippingCostsCalculation
                    skus_ids={[selectedSku.id]}
                    quantities={[quantity.current]}
                    total={selectedSku?.price_sale}
                  />
                </Skeleton>
              </View>
            )}

            {product && !isLoading && (
              <YStack mt={24} gap={24}>
                <YStack>
                  <H2 fontSize={24}>Descrição do produto</H2>
                  <Paragraph lineHeight={28}>
                    {removeHTMLTags(product.texts.data.description)}
                  </Paragraph>
                </YStack>
                <YStack>
                  <H2 fontSize={24}>Especificações técnicas</H2>
                  <List
                    items={
                      getItemsFromHTMLList(
                        product?.texts.data.specifications
                      ) ?? []
                    }
                  />
                </YStack>
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
                <View mt={12}>
                  <Tabs
                    width={SCREEN.width - SCREEN.paddingX * 2}
                    label="Avaliações e Dúvidas"
                    tabs={[
                      {
                        title: `Avaliações (${reviews?.length ?? '0'})`,
                        value: 'reviews',
                        icon: ChatCenteredText,
                        size: reviews ? reviews.length * 400 : 1000,
                        content: (
                          <ProductReviews
                            data={reviews ?? []}
                            productId={product.id}
                            productName={product.name}
                          />
                        ),
                      },
                      {
                        title: 'Dúvidas (0)',
                        value: 'questions',
                        icon: Question,
                        size: 400,
                        content: <Text>Tab 2</Text>,
                      },
                    ]}
                  />
                </View>
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
