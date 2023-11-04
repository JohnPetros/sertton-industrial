import { ArrowDown, Percent } from 'phosphor-react-native'
import { getTokens, Text, XStack } from 'tamagui'

import { calculateDiscount } from '@/utils/helpers/calculateDiscount'

interface DiscountProps {
  discountPrice: number
  salesPrice: number
}

export function Discount({ discountPrice, salesPrice }: DiscountProps) {
  const discount = calculateDiscount(discountPrice, salesPrice)

  return (
    <XStack
      px={4}
      py={2}
      alignItems="center"
      bg="$blue400"
      borderRadius={12}
      gap={2}
    >
      <ArrowDown color={getTokens().color.white.val} size={12} weight="bold" />
      <Text color="$white" fontSize={12} fontWeight="600">
        {discount}
      </Text>
      <Percent color={getTokens().color.white.val} size={12} weight="bold" />
    </XStack>
  )
}
