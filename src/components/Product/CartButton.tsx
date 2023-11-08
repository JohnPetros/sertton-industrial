import { ShoppingCart } from 'phosphor-react-native'
import { getTokens } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { CartDialog } from '@/components/CartDialog'

interface CartButtonProps {
  product: {
    id: number
    name: string
    skus: Sku[]
  }
}

export function CartButton({ product }: CartButtonProps) {
  function handleCart() {}

  return (
    <CartDialog product={product}>
      <Button
        w={12}
        h={24}
        icon={<ShoppingCart color={getTokens().color.white.val} />}
        onPress={handleCart}
      />
    </CartDialog>
  )
}
