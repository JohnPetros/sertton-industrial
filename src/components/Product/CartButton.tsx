import { ShoppingCart } from 'phosphor-react-native'
import { getTokens } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Button } from '@/components/Button'
import { CartDialog } from '@/components/CartDialog'
import { useCartStore } from '@/stores/cartStore'

interface CartButtonProps {
  product: {
    id: number
    slug: string
    name: string
    skus: Sku[]
  }
}

export function CartButton({ product }: CartButtonProps) {
  const items = useCartStore((store) => store.state.items)
  const isInCart = items.some((item) => item.slug === product.slug)

  return (
    <CartDialog product={product}>
      <Button
        w={12}
        h={24}
        background={isInCart ? 'primary' : 'secondary'}
        icon={<ShoppingCart color={getTokens().color.white.val} />}
      />
    </CartDialog>
  )
}
