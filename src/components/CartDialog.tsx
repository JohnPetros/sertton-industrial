import { ReactNode, useEffect, useRef, useState } from 'react'
import { DialogClose, Text, View, XStack, YStack } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { Dialog, DialogRef } from '@/components/Dialog'
import { NumberInput } from '@/components/NumberInput'
import { Select, SelectRef } from '@/components/Select'
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
    selectedVariationsValues,
    variationNames,
    setSkusVariations,
    handleSelectedVariationChange,
    getVariationValuesByVariationName,
  } = useSkus(product.id)

  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [errors, setErrors] = useState<boolean[]>([])
  const dialogRef = useRef<DialogRef | null>(null)
  const selectRefs = useRef<SelectRef[]>([])

  console.log(errors)

  const {
    state: { items },
    actions: { addItem, setItemQuantity },
  } = useCartStore()

  const item = items.find((item) => item.slug === product.slug)
  const isInCart = !!item

  const hasErrors = selectedVariationsValues.length !== variationNames.length

  function fillArray<Value>(value: Value, length: number) {
    return Array.from<Value>({ length }).fill(value)
  }

  function handleDialogOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  function handleQuantityChange(quantity: number) {
    setQuantity(quantity)

    if (isInCart) setItemQuantity(item.skuId, quantity)
  }

  function handleSelectChange(index: number, value: string) {
    const currentSelectedValues = [
      ...new Set(
        selectRefs.current
          .map((selectRef) => selectRef.value)
          .filter((currentValue) => !!currentValue && currentValue !== value)
      ),
    ]

    const isFirst = index === 0

    handleSelectedVariationChange(value, isFirst ? [] : currentSelectedValues)

    if (isFirst) {
      for (
        let refIndex = index + 1;
        refIndex < selectRefs.current.length;
        refIndex++
      ) {
        selectRefs.current[refIndex].reset()
      }
    }

    console.log(hasErrors)

    if (!hasErrors) setErrors(fillArray<boolean>(false, variationNames.length))
  }

  function handleAddCartItem() {
    if (hasErrors) {
      const errors: boolean[] = []

      selectRefs.current.forEach((selectRef, index) => {
        const hasError = !selectRef.value

        errors[index] = hasError
      })

      console.log({ errors })
      setErrors(errors)
      return
    }

    setErrors(fillArray<boolean>(false, variationNames.length))

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
    if (isOpen && skus) {
      setSkusVariations(skus)
      setQuantity(isInCart ? item.quantity : 1)
    }
  }, [isOpen, skus, isInCart])

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
              mb={24}
            >
              {product.name}
            </Text>
            <YStack gap={12}>
              {variationNames.length > 0 &&
                variationNames.map((variationName, index) => {
                  const values =
                    getVariationValuesByVariationName(variationName)
                  const hasValues = values.length > 0

                  console.log(errors[index])

                  return (
                    <Select
                      ref={(ref) => {
                        if (ref) selectRefs.current[index] = ref
                      }}
                      key={variationName}
                      label={variationName}
                      width="100%"
                      defaultValue={'Selecionar'}
                      items={hasValues ? values : ['Selecionar']}
                      onChange={(variationChange) =>
                        handleSelectChange(index, variationChange)
                      }
                      isDisable={!hasValues}
                      hasError={errors[index]}
                    />
                  )
                })}
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
