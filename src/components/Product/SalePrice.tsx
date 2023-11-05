import { Text, TextProps, XStack } from 'tamagui'

import { formatPrice } from '@/utils/helpers/formatPrice'

interface PriceProps extends TextProps {
  price: number
}

export function SalePrice({ price, ...rest }: PriceProps) {
  return (
    <Text
      color="$blue500"
      fontWeight="600"
      textTransform="uppercase"
      fontSize={16}
      {...rest}
    >
      {formatPrice(price)}
    </Text>
  )
}
