import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'expo-router'
import { useGlobalSearchParams } from 'expo-router/src/hooks'
import { ArrowsOut } from 'phosphor-react-native'
import { getTokens, H2, ScrollView, View, XStack, YStack } from 'tamagui'

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

export default function Product() {
  const { product_slug } = useGlobalSearchParams()
  const { product } = useProduct(String(product_slug))
  const [quantity, setQuantity] = useState(1)
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const skuSelectsRef = useRef<SkuSelectsRef | null>(null)

  const {
    state: { items },
    actions: { addItem, setItemQuantity },
  } = useCartStore()
  const router = useRouter()

  const [isFullImageVisible, setIsFullImageVisible] = useState(false)

  const item = items.find((item) => item.slug === product?.slug)
  const isInCart = !!item

  function handleSkuChange(sku: Sku) {
    console.log(sku)
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

    if (!shouldAddTocart) return

    if (!isInCart && product && selectedSku) {
      addItem({ slug: product.slug, skuId: selectedSku.id, quantity })
      router.push(ROUTES.cart)
    }
  }

  useEffect(() => {
    if (product && skuSelectsRef.current?.selectedSku) {
      setSelectedSku(skuSelectsRef.current.selectedSku)
    }
  }, [product, skuSelectsRef.current?.selectedSku])

  if (product)
    return (
      <YStack>
        <View px={SCREEN.paddingX}>
          <Header />
          <Search />
        </View>

        {selectedSku && (
          <FullImage
            isVisible={isFullImageVisible}
            data={selectedSku.images.data}
            close={() => setIsFullImageVisible(false)}
          />
        )}

        <ScrollView
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 2 }}
        >
          <Skeleton
            isVisible={Boolean(selectedSku)}
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
            {selectedSku && (
              <>
                <SkuCode fontSize={14}>{selectedSku?.sku}</SkuCode>
                <Name fontSize={24}>{product.name}</Name>
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
              </>
            )}
            <YStack mt={12} gap={32} alignItems="flex-start">
              <SkuSelects
                ref={skuSelectsRef}
                productId={product.id}
                onSkuChange={handleSkuChange}
              />
              <NumberInput
                label="Quantidade do produto"
                number={quantity}
                onChangeNumber={handleQuantityChange}
              />
              <Button w="100%" onPress={handleAddToCart}>
                Adicionar ao carinho
              </Button>
            </YStack>

            {selectedSku && (
              <View mt={24}>
                <ShippingCostsCalculation
                  skus_ids={[selectedSku.id]}
                  quantities={[quantity]}
                  total={selectedSku?.price_sale}
                />
              </View>
            )}

            <YStack mt={24}>
              <H2>Descrição do produto</H2>
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    )
}
