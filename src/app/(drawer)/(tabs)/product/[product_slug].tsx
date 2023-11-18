import { useCallback, useEffect, useRef, useState } from 'react'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import { useGlobalSearchParams } from 'expo-router/src/hooks'
import { ArrowsOut } from 'phosphor-react-native'
import {
  getTokens,
  H2,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
} from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { FullImage } from '@/components/FullImage'
import { Header } from '@/components/Header'
import { NumberInput } from '@/components/NumberInput'
import {
  Discount,
  DiscountPrice,
  Image,
  Name,
  SalePrice,
  SkuCode,
} from '@/components/Product'
import { Search } from '@/components/Search'
import ShippingCostsCalculation from '@/components/ShippingCostsCalculation'
import { Skeleton } from '@/components/Skeleton'
import { SkuSelects, SkuSelectsRef } from '@/components/SkuSelects'
import { useProduct } from '@/hooks/useProduct'
import { useCartStore } from '@/stores/cartStore'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'
import { TAB_BAR_HEIGHT } from '@/utils/constants/tabBarHeight'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export default function Product() {
  const { product_slug } = useGlobalSearchParams()
  const { product, refetch } = useProduct(String(product_slug))
  const [isLoading, setIsLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const [isFullImageVisible, setIsFullImageVisible] = useState(false)
  const skuSelectsRef = useRef<SkuSelectsRef | null>(null)

  const {
    state: { items },
    actions: { addItem, setItemQuantity },
  } = useCartStore()
  const router = useRouter()
  const navigation = useNavigation()
  const hasVariations = Boolean(
    skuSelectsRef.current?.selectedSku?.variations.length
  )

  const item = items.find((item) => item.slug === product?.slug)
  const isInCart = !!item

  const isSkeletonVisible = isLoading

  function handleSkuChange(sku: Sku) {
    setSelectedSku(sku)
  }

  function handleQuantityChange(quantity: number) {
    setQuantity(quantity)

    if (isInCart) setItemQuantity(item.skuId, quantity)
  }

  function handleFullImage() {
    setIsFullImageVisible(!isFullImageVisible)
  }

  function handleAddToCart() {
    const shouldAddTocart = skuSelectsRef.current?.onAddSkuToCart()

    if (hasVariations && !shouldAddTocart) return

    if (!isInCart && product && selectedSku) {
      addItem({ slug: product.slug, skuId: selectedSku.id, quantity })
      router.push(ROUTES.cart)
    }
  }

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
    }, [])
  )

  useEffect(() => {
    navigation.addListener('blur', () => handleScreenBlur())

    return () => navigation.removeListener('blur', () => handleScreenBlur())
  }, [navigation])

  useEffect(() => {
    if (!isLoading || !selectedSku) return

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [selectedSku])

  return (
    <YStack>
      <View px={SCREEN.paddingX}>
        <Header />
        <Search />
      </View>

      {selectedSku && !isSkeletonVisible && (
        <FullImage
          isVisible={isFullImageVisible}
          data={selectedSku.images.data}
          close={() => setIsFullImageVisible(false)}
        />
      )}

      <ScrollView
        contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 2 }}
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
                    <SalePrice fontSize={24} price={selectedSku?.price_sale} />
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
          <YStack mt={hasVariations ? 12 : 0} gap={32} alignItems="flex-start">
            {!product ? (
              <Skeleton isVisible={!product} width={SCREEN.width} height={40}>
                <></>
              </Skeleton>
            ) : (
              <>
                {product && (
                  <SkuSelects
                    ref={skuSelectsRef}
                    productId={product.id}
                    onSkuChange={handleSkuChange}
                  />
                )}
              </>
            )}

            <Skeleton isVisible={isSkeletonVisible} height={40}>
              <NumberInput
                label="Quantidade do produto"
                number={quantity}
                onChangeNumber={handleQuantityChange}
              />
            </Skeleton>
            <Skeleton
              isVisible={isSkeletonVisible}
              width={SCREEN.width}
              height={40}
            >
              <Button w="100%" onPress={handleAddToCart}>
                Adicionar ao carinho
              </Button>
            </Skeleton>
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
            <YStack mt={24}>
              <H2 fontSize={24}>Descrição do produto</H2>
              <Paragraph lineHeight={28}>
                {removeHTMLTags(product.texts.data.description)}
              </Paragraph>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
