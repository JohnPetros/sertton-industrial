import { useCallback, useEffect, useRef, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
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
import { BottomCartButton } from '@/components/BottomCartButton'
import { Button } from '@/components/Button'
import { Collection } from '@/components/Collection'
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
import { Search } from '@/components/Search'
import ShippingCostsCalculation from '@/components/ShippingCostsCalculation'
import { Skeleton } from '@/components/Skeleton'
import { SkuSelects, SkuSelectsRef } from '@/components/SkuSelects'
import { Tabs } from '@/components/Tabs'
import { Timer } from '@/components/Timer'
import { useProduct } from '@/hooks/useProduct'
import { useDate } from '@/services/date'
import { useCartStore } from '@/stores/cartStore'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'
import { getItemsFromHTMLList } from '@/utils/helpers/getItemsFromHTMLList'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export default function Product() {
  const { product_slug } = useGlobalSearchParams()
  const { product, similarProducts, refetch } = useProduct(String(product_slug))
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const skuSelectsRef = useRef<SkuSelectsRef | null>(null)
  const fullImageRef = useRef<FullImageRef | null>(null)
  const scrollRef = useRef<ScrollView | null>(null)
  const bottomTabBarHeight = useBottomTabBarHeight()

  console.log(selectedSku?.variations[0].name)

  const {
    state: { items },
    actions: { addItem, setItemQuantity },
  } = useCartStore()
  const router = useRouter()
  const navigation = useNavigation()
  const { calculateTimeUtilTodayEnd } = useDate()
  const timeUtilTodayEnd = calculateTimeUtilTodayEnd()

  const hasVariations = Boolean(
    skuSelectsRef.current?.selectedSku?.variations.length
  )

  const item = items.find((item) => item.slug === product?.slug)
  const isInCart = !!item
  const isSkeletonVisible = !product || isLoading || !selectedSku

  function handleSkuChange(sku: Sku) {
    setSelectedSku(sku)
  }

  function handleQuantityChange(quantity: number) {
    setQuantity(quantity)

    if (isInCart) setItemQuantity(item.skuId, quantity)
  }

  function handleFullImage() {
    fullImageRef.current?.open()
  }

  function handleAddToCart() {
    const shouldAddTocart = skuSelectsRef.current?.onAddSkuToCart()

    if (hasVariations && !shouldAddTocart) return

    if (!isInCart && product && selectedSku) {
      addItem({ slug: product.slug, skuId: selectedSku.id, quantity })
      router.push(ROUTES.cart)
    }
  }

  function handleCartButtonLayout({ nativeEvent }: LayoutChangeEvent) {
    const { x, y, width, height } = nativeEvent.layout
  }

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const scrollY = event.contentOffset.y
  })

  function handleScreenBlur() {
    setIsLoading(true)
  }

  useEffect(() => {
    if (product && skuSelectsRef.current?.selectedSku) {
      setSelectedSku(skuSelectsRef.current.selectedSku)
    }
  }, [product, skuSelectsRef.current?.selectedSku])

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      refetch()
      scrollRef.current?.scrollTo({ y: 0 })
    }, [])
  )

  useEffect(() => {
    navigation.addListener('blur', () => handleScreenBlur())

    return () => navigation.removeListener('blur', () => handleScreenBlur())
  }, [navigation])

  useEffect(() => {
    if (!isLoading) return

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [selectedSku])

  return (
    <KeyboardHandlerView>
      {selectedSku && !isSkeletonVisible && (
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
            paddingBottom: bottomTabBarHeight * 2,
          }}
          scrollEnabled={!isSkeletonVisible}
        >
          <Skeleton
            isVisible={isSkeletonVisible}
            width={SCREEN.width}
            height={224}
          >
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
              <Skeleton isVisible={isSkeletonVisible} width={120} height={24}>
                {selectedSku && (
                  <SkuCode fontSize={14}>{selectedSku?.sku}</SkuCode>
                )}
              </Skeleton>
              <Skeleton isVisible={isSkeletonVisible} width={300} height={48}>
                {selectedSku && (
                  <Name fontSize={24}>{String(product?.name)}</Name>
                )}
              </Skeleton>

              <Skeleton isVisible={isSkeletonVisible} width={150} height={48}>
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
                    isVisible={isSkeletonVisible}
                    width={SCREEN.width - SCREEN.paddingX}
                    height={70}
                  >
                    <></>
                  </Skeleton>
                </View>
                {product && (
                  <SkuSelects
                    ref={skuSelectsRef}
                    productId={product.id}
                    onSkuChange={handleSkuChange}
                  />
                )}
              </View>

              <Skeleton isVisible={isSkeletonVisible} height={40}>
                <NumberInput
                  label="Quantidade do produto"
                  number={quantity}
                  onChangeNumber={handleQuantityChange}
                />
              </Skeleton>

              <Skeleton isVisible={isSkeletonVisible} height={40}>
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

              {isSkeletonVisible ? (
                <Skeleton
                  isVisible={isSkeletonVisible}
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
                  isVisible={isSkeletonVisible}
                  width={SCREEN.width - 48}
                  height={40}
                >
                  <ShippingCostsCalculation
                    skus_ids={[selectedSku.id]}
                    quantities={[quantity]}
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
              </YStack>
            )}

            <View mt={48}>
              {product && (
                <Tabs
                  label="Avaliações e Dúvidas"
                  tabs={[
                    {
                      title: 'Avaliações',
                      value: 'reviews',
                      icon: ChatCenteredText,
                      size: 1200,
                      content: <ProductReviews productId={product.id} />,
                    },
                    {
                      title: 'Dúvidas',
                      value: 'questions',
                      icon: Question,
                      size: 200,
                      content: <Text>Tab 2</Text>,
                    },
                  ]}
                />
              )}
            </View>
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
