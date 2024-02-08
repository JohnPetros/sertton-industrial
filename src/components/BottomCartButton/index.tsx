import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { XStack } from 'tamagui'
import { YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { DiscountPrice, SalePrice } from '@/components/Product'

interface BottomCartButtonProps {
  priceSale: number
  priceDiscount: number
  onPress: () => void
}

export function BottomCartButton({
  priceSale,
  priceDiscount,
  onPress,
}: BottomCartButtonProps) {
  const bottomTabBarHeight = useBottomTabBarHeight()

  return (
    <XStack
      position="absolute"
      bottom={bottomTabBarHeight * 3.5}
      justifyContent="space-between"
      bg="$white"
      w="100%"
      py={16}
      px={24}
    >
      <YStack>
        <DiscountPrice fontSize={14} price={priceSale} />
        <SalePrice fontSize={16} price={priceDiscount} />
      </YStack>
      <Button onPress={onPress}>Adicionar ao carrinho</Button>
    </XStack>
  )
}
