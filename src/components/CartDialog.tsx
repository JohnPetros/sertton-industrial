import { ReactNode, useEffect, useState } from 'react'
import { DialogClose, Text, View, XStack, YStack } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { NumberInput } from '@/components/NumberInput'
import { Select } from '@/components/Select'
import { useSkus } from '@/hooks/useSkus'
import { useCartStore } from '@/stores/cartStore'

interface CartDialogProps {
  children: ReactNode
  product: {
    id: number
    slug: string
    name: string
    skus: Sku[]
  }
}

export function CartDialog({ children, product }: CartDialogProps) {
  const {
    skus,
    selectedSku,
    variationsByName,
    setVariations,
    handleSelectedVariationChange,
  } = useSkus(product.id)

  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const {
    state: { items },
    actions: { addItem, setItemQuantity },
  } = useCartStore()

  const item = items.find((item) => item.slug === product.slug)
  const isInCart = !!item

  function handleDialogOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  function handleQuantityChange(quantity: number) {
    setQuantity(quantity)

    if (isInCart) setItemQuantity(item.skuId, quantity)
  }

  function handleAddCartItem() {
    if (selectedSku && !isInCart) {
      const item = {
        slug: product.slug,
        skuId: selectedSku.id,
        quantity,
      }

      addItem(item)
    }
  }

  useEffect(() => {
    if (isOpen && skus) {
      setVariations(skus)
      setQuantity(isInCart ? item.quantity : 1)
    }
  }, [isOpen, skus])

  return (
    <Dialog
      onOpenChange={handleDialogOpenChange}
      title="Adicionar ao carrinho"
      content={
        <YStack mt={8}>
          <YStack
            borderRadius={4}
            borderWidth={1}
            borderColor="$gray100"
            justifyContent="center"
            p={24}
          >
            <Text
              color="$gray800"
              fontWeight="600"
              textAlign="center"
              fontSize={16}
              mb={24}
            >
              {product.name}
            </Text>
            {variationsByName &&
              Object.keys(variationsByName).map((variationName) => (
                <Select
                  key={variationName}
                  label={variationName}
                  width="100%"
                  defaultValue={'Inox'}
                  items={variationsByName[variationName].variations.map(
                    (variation) => variation.value
                  )}
                  onChange={handleSelectedVariationChange}
                />
              ))}

            <View mt={24}>
              <NumberInput
                label="Quantidade do produto"
                number={quantity}
                onChangeNumber={handleQuantityChange}
              />
            </View>
          </YStack>
          <XStack
            mt={24}
            gap={12}
            alignItems="center"
            justifyContent="space-between"
          >
            <DialogClose asChild>
              <Button background="secondary">Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onPress={handleAddCartItem}>Confirmar</Button>
            </DialogClose>
          </XStack>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
