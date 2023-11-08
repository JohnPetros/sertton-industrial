import { ReactNode, useState } from 'react'
import { Text, View, XStack, YStack } from 'tamagui'

import { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { NumberInput } from '@/components/NumberInput'
import { Select } from '@/components/Select'
import { useVariations } from '@/hooks/useVariation'

interface CartDialogProps {
  children: ReactNode
  product: {
    id: number
    name: string
    skus: Sku[]
  }
}

export function CartDialog({ children, product }: CartDialogProps) {
  const {
    selectedVariantionsIds,
    variantionsByName,
    setVariations,
    handleSelectedVariationChange,
  } = useVariations(product.skus.map((sku) => sku.variations[0]))
  const [quantity, setQuantity] = useState(1)

  function handleDialogOpenChange(isOpen: boolean) {
    if (isOpen) setVariations()
  }

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
            {variantionsByName &&
              Object.keys(variantionsByName).map((variationName) => (
                <Select
                  key={variationName}
                  label={variationName}
                  width="100%"
                  defaultValue={'Inox'}
                  items={variantionsByName[variationName].map(
                    (variation) => variation.value
                  )}
                  onChange={handleSelectedVariationChange}
                />
              ))}

            <View mt={24}>
              <NumberInput
                label="Quantidade do produto"
                number={quantity}
                onChangeNumber={setQuantity}
              />
            </View>
          </YStack>
          <XStack
            mt={24}
            gap={12}
            alignItems="center"
            justifyContent="space-between"
          >
            <Button background="secondary">Cancelar</Button>
            <Button>Confirmar</Button>
          </XStack>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
