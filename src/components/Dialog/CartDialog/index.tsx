import { ReactNode } from 'react'
import { DialogClose, Text, View, XStack, YStack } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { useCartDialog } from '@/components/Dialog/CartDialog/useCartDialog'
import { NumberInput } from '@/components/NumberInput'
import { SkuSelects } from '@/components/SkuSelects'
import { SCREEN } from '@/utils/constants/screen'

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
    handleAddCartItem,
    handleQuantityChange,
    quantity,
    dialogRef,
    skuSelectsRef,
  } = useCartDialog(product.slug, product.skus)

  return (
    <Dialog
      ref={dialogRef}
      title="Adicionar ao carrinho"
      width={SCREEN.width - SCREEN.paddingX * 2}
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
            <YStack mt={12}>
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
