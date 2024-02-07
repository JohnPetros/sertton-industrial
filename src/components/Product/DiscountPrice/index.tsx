import { Text, TextProps } from 'tamagui'

import { formatPrice } from '@/utils/helpers/formatPrice'

interface PriceProps extends TextProps {
  price: number
}

export function DiscountPrice({ price, ...rest }: PriceProps) {
  return (
    <Text
      color="$gray400"
      textTransform="uppercase"
      textDecorationLine="line-through"
      fontSize={14}
      {...rest}
    >
      {formatPrice(price)}
    </Text>
  )
}
