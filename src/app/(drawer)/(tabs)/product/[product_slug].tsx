import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import { useGlobalSearchParams } from 'expo-router/src/hooks'
import { ArrowsOut } from 'phosphor-react-native'
import { getTokens, H2, ScrollView, View, XStack, YStack } from 'tamagui'

import { Button } from '@/components/Button'
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
import { Select } from '@/components/Select'
import ShipmentCalculation from '@/components/ShipmentCalculation'
import { useProduct } from '@/hooks/useProduct'
import { useSkus } from '@/hooks/useSkus'
import { useCartStore } from '@/stores/cartStore'
import { TAB_BAR_HEIGHT } from '@/utils/constants/tabBarHeight'

const SCREEN_WIDTH = Dimensions.get('screen').width

const PADDING_X = 24

export default function Product() {
  const { product_slug } = useGlobalSearchParams()
  const { product } = useProduct(String(product_slug))
  const {
    selectedSku,
    skus,
    variationsByName,
    handleSelectedVariationChange,
    setVariations,
  } = useSkus(product ? product.id : 0)
  const [quantity, setQuantity] = useState(1)

  const {
    state: { items },
    actions: { addItem, setItemQuantity },
  } = useCartStore()

  const item = items.find((item) => item.slug === product?.slug)
  const isInCart = !!item

  console.log(product?.description)

  function handleQuantityChange(quantity: number) {
    setQuantity(quantity)

    if (isInCart) setItemQuantity(item.skuId, quantity)
  }

  useEffect(() => {
    if (skus) setVariations(skus)
  }, [skus])

  if (product && selectedSku)
    return (
      <YStack>
        <View px={PADDING_X}>
          <Header />
          <Search />
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT * 2 }}
        >
          <View position="relative" mt={24}>
            <Image
              data={selectedSku.images.data}
              size="large"
              width={SCREEN_WIDTH}
              height={224}
            />
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
          <YStack px={PADDING_X} mt={12} gap={8}>
            <SkuCode fontSize={14}>{selectedSku.sku}</SkuCode>
            <Name fontSize={24}>{product.name}</Name>
            <XStack alignItems="flex-start" gap={12}>
              <YStack>
                <SalePrice fontSize={24} price={selectedSku.price_sale} />
                <DiscountPrice
                  fontSize={14}
                  price={selectedSku.price_discount}
                />
              </YStack>
              <Discount
                salesPrice={selectedSku.price_sale}
                discountPrice={selectedSku.price_discount}
              />
            </XStack>
            <YStack mt={12} gap={32} alignItems="flex-start">
              {variationsByName &&
                Object.keys(variationsByName).map((variationName) => (
                  <View key={variationName}>
                    <Select
                      label={variationName}
                      width="70%"
                      defaultValue={'Inox'}
                      items={variationsByName[variationName].variations.map(
                        (variation) => variation.value
                      )}
                      onChange={handleSelectedVariationChange}
                    />
                  </View>
                ))}
              <NumberInput
                label="Quantidade do produto"
                number={quantity}
                onChangeNumber={handleQuantityChange}
              />
              <Button w="100%">Adicionar ao carinho</Button>
            </YStack>

            <View mt={24}>
              <ShipmentCalculation />
            </View>

            <YStack mt={24}>
              <H2>Descrição do produto</H2>
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    )
}
