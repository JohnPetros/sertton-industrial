import { ShoppingCart } from 'phosphor-react-native'
import { getTokens } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { CartDialog } from '@/components/Dialog/CartDialog'

interface CartButtonProps {
  product: {
    id: string
    slug: string
    name: string
    skus: Sku[]
  }
}

export function CartButton({ product }: CartButtonProps) {
  return (
    <CartDialog product={product}>
      <Button
        w={12}
        h={24}
        icon={<ShoppingCart color={getTokens().color.white.val} />}
      />
    </CartDialog>
  )
}
