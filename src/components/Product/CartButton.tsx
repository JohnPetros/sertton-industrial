import { ShoppingCart } from 'phosphor-react-native'
import { getTokens } from 'tamagui'

import { Button } from '@/components/Button'

interface CartButtonProps {
  productId: number
}

export function CartButton({ productId }: CartButtonProps) {
  function handleCart() {
    console.log(productId)
  }

  return (
    <Button
      w={12}
      h={24}
      position="absolute"
      bottom={8}
      right={8}
      icon={<ShoppingCart color={getTokens().color.white.val} />}
      onPress={handleCart}
    />
  )
}
