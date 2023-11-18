import { ReactNode, useEffect, useRef, useState } from 'react'
import { DialogClose, Text, View, XStack, YStack } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { Dialog, DialogRef } from '@/components/Dialog'
import { NumberInput } from '@/components/NumberInput'
import { SkuSelects, SkuSelectsRef } from '@/components/SkuSelects'
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
  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<DialogRef | null>(null)
  const skuSelectsRef = useRef<SkuSelectsRef | null>(null)

  const {
    state: { items },
    actions: { addItem, setItemQuantity },
  } = useCartStore()

  const item = items.find((item) => item.slug === product.slug)
  const isInCart = !!item
  const hasVariations = product.skus.every((sku) => sku.variations.length > 0)

  function handleDialogOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  function handleQuantityChange(quantity: number) {
    setQuantity(quantity)

    if (isInCart) setItemQuantity(item.skuId, quantity)
  }

  function handleAddCartItem() {
    if (!skuSelectsRef.current) return

    const { onAddSkuToCart, selectedSku } = skuSelectsRef.current

    const shouldAddToCart = onAddSkuToCart()

    if (hasVariations && !shouldAddToCart) return

    if (selectedSku && !isInCart) {
      const item = {
        slug: product.slug,
        skuId: selectedSku.id,
        quantity,
      }

      addItem(item)
    }

    dialogRef.current?.close()
  }

  useEffect(() => {
    if (isOpen) {
      // setSkusVariations(skus)
      setQuantity(isInCart ? item.quantity : 1)
    }
  }, [isOpen, isInCart])

  return (
    <Dialog
      ref={dialogRef}
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
            >
              {product.name}
            </Text>
            <YStack gap={12} mt={hasVariations ? 24 : 0}>
              <SkuSelects ref={skuSelectsRef} productId={product.id} />
            </YStack>

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
            <Button onPress={handleAddCartItem}>Confirmar</Button>
          </XStack>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
