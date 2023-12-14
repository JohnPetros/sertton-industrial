import { useRef } from 'react'

import type { Sku } from '@/@types/sku'
import { DialogRef } from '@/components/Dialog'
import { SkuSelectsRef } from '@/components/SkuSelects'
import { useCartStore } from '@/stores/cartStore'

export function useCartDialog(productSlug: string, skus: Sku[]) {
  const dialogRef = useRef<DialogRef | null>(null)
  const skuSelectsRef = useRef<SkuSelectsRef | null>(null)
  const quantity = useRef(1)

  const addItem = useCartStore((store) => store.actions.addItem)

  const hasVariations = skus.every((sku) => sku.variations.length > 0)

  function handleQuantityChange(newQuantity: number) {
    quantity.current = newQuantity
  }

  function handleAddCartItem() {
    if (!skuSelectsRef.current) return

    const { onAddSkuToCart, selectedSku } = skuSelectsRef.current

    const shouldAddToCart = onAddSkuToCart()

    if (hasVariations && !shouldAddToCart) return

    if (selectedSku) {
      const item = {
        slug: productSlug,
        skuId: selectedSku.id,
        quantity: quantity.current,
      }

      addItem(item)
    }

    dialogRef.current?.close()
  }

  return {
    dialogRef,
    skuSelectsRef,
    quantity: quantity.current,
    handleQuantityChange,
    handleAddCartItem,
  }
}
