import { useEffect, useState } from 'react'
import { Trash } from 'phosphor-react-native'
import { getTokens, XStack, YStack } from 'tamagui'

import type { Product as ProductData } from '@/@types/product'
import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { NumberInput } from '@/components/NumberInput'
import * as Product from '@/components/Product'
import { useCartStore } from '@/stores/cartStore'

interface ProductCartItemProps {
  data: ProductData
  quantity: number
  selectedSkuId: number
  width: number
}

export function ProductCartItem({
  data: { name, images, skus },
  quantity,
  selectedSkuId,
  width,
}: ProductCartItemProps) {
  const [quantityValue, setQuantityValue] = useState(quantity)
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)

  const { removeItem } = useCartStore((store) => store.actions)

  function handleRemoveItem() {
    if (selectedSku) removeItem(selectedSku.id)
  }

  function selectSku() {
    const selectedSku = skus.data.find((sku) => sku.id === selectedSkuId)

    if (selectedSku) {
      console.log(selectedSku)

      setSelectedSku(selectedSku)
    }
  }

  useEffect(() => {
    selectSku()
  }, [])

  return (
    <XStack alignItems="center" gap={12}>
      <Product.Image
        data={images.data}
        size="medium"
        width={(width - 12) / 2}
        height={180}
      />
      <YStack w={(width - 12) / 2} gap={8}>
        {selectedSku && <Product.SkuCode>{selectedSku.sku}</Product.SkuCode>}
        <Product.Name>{name}</Product.Name>
        <NumberInput
          label="Quantidade do produto"
          number={quantityValue}
          onChangeNumber={setQuantityValue}
        />
        <XStack alignItems="center" justifyContent="space-between">
          {selectedSku && (
            <YStack>
              <Product.SalePrice price={selectedSku.price_sale} />
              <Product.DiscountPrice price={selectedSku.price_discount} />
            </YStack>
          )}
          <Button
            background="secondary"
            w={24}
            h={24}
            onPress={handleRemoveItem}
          >
            <Trash size={16} color={getTokens().color.white.val} />
          </Button>
        </XStack>
      </YStack>
    </XStack>
  )
}
