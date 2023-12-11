import { Separator, Text, XStack, YStack } from 'tamagui'

import { Product } from '@/@types/product'
import { useCartSummary } from '@/hooks/useCartSummary'
import { formatPrice } from '@/utils/helpers/formatPrice'

type Item = Product & { quantity: number; selectedSkuId: number }

interface CartSummaryProps {
  items: Item[]
}

export function CartSummary({ items }: CartSummaryProps) {
  const { totalDiscount, totalItems, totalToPay } = useCartSummary(items)

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
