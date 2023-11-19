import { useEffect, useState } from 'react'
import { Separator, Text, XStack, YStack } from 'tamagui'

import { Product } from '@/@types/product'
import { useCartStore } from '@/stores/cartStore'
import { formatPrice } from '@/utils/helpers/formatPrice'

type Item = Product & { quantity: number; selectedSkuId: number }

interface CartSummaryProps {
  totalItems: number
  totalToPay: number
  totalDiscount: number
  items: Item[]
}

export function CartSummary({ items }: CartSummaryProps) {
  const cartItems = useCartStore((store) => store.state.items)

  const [totalToPay, setTotalToPay] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  function calculateTotals() {
    const totalToPay = items.reduce((total, product) => {
      const selectedSku = product.skus.data.find(
        (sku) => sku.id === product.selectedSkuId
      )

      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === selectedSku?.id
      )?.quantity

      if (selectedSku && quantity)
        return (
          total +
          (selectedSku.price_sale + selectedSku.price_discount) * quantity
        )
      else return total
    }, 0)

    const totalDiscount = items.reduce((total, product) => {
      const selectedSku = product.skus.data.find(
        (sku) => sku.id === product.selectedSkuId
      )

      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === selectedSku?.id
      )?.quantity

      if (selectedSku && quantity)
        return total + selectedSku.price_discount * quantity
      else return total
    }, 0)

    const totalItems = items.reduce((total, product) => {
      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === product.selectedSkuId
      )?.quantity

      return quantity ? total + quantity : 0
    }, 0)

    setTotalToPay(totalToPay)
    setTotalDiscount(totalDiscount)
    setTotalItems(totalItems)
  }

  useEffect(() => {
    if (cartItems?.length) calculateTotals()
  }, [cartItems])

  return (
    <YStack separator={<Separator bg="$gray400" />} gap={8}>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={16} color="$gray600">
          Subtotal ({totalItems} items)
        </Text>
        <Text fontSize={16} color="$gray600" fontWeight="600">
          {formatPrice(totalToPay)}
        </Text>
      </XStack>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={16} color="$green500">
          Desconto
        </Text>
        <Text fontSize={16} color="$green500" fontWeight="600">
          - {formatPrice(totalDiscount)}
        </Text>
      </XStack>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize={16} color="$gray600" fontWeight="600">
          Total
        </Text>
        <Text fontSize={16} color="$blue600" fontWeight="600">
          {formatPrice(totalToPay - totalDiscount)}
        </Text>
      </XStack>
    </YStack>
  )
}
