import { Text, XStack } from 'tamagui'

import { formatPrice } from '@/utils/helpers/formatPrice'

interface PriceProps {
  salesPrice: number
  discountPrice: number
}

export function Price({ salesPrice, discountPrice }: PriceProps) {
  return (
    <XStack justifyContent="space-between">
      <Text
        color="$blue500"
        fontWeight="600"
        textTransform="uppercase"
        fontSize={16}
      >
        {formatPrice(salesPrice)}
      </Text>
      <Text
        color="$gray400"
        textTransform="uppercase"
        textDecorationLine="line-through"
        fontSize={14}
      >
        {formatPrice(discountPrice)}
      </Text>
    </XStack>
  )
}
