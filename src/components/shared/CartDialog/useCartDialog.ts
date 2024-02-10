import { MutableRefObject, useRef } from 'react'

import type { DialogRef } from '../Dialog/types/DialogRef'
import { SkuSelectsRef } from '../SkuSelects/types/SkuSelectsRef'

import type { Sku } from '@/@types/sku'
import { useCartStore } from '@/stores/cartStore'

type UseCartDialogParams = {
  productSlug: string
  skus: Sku[]
  quantity: MutableRefObject<number>
  dialogRef: MutableRefObject<DialogRef | null>
  skuSelectsRef: MutableRefObject<SkuSelectsRef | null>
}

export function useCartDialog({
  productSlug,
  skus,
  quantity,
  dialogRef,
  skuSelectsRef,
}: UseCartDialogParams) {
  const addItem = useCartStore((store) => store.actions.addItem)

  const hasVariations = skus.every((sku) => sku.variations.length > 0)

  function handleQuantityChange(newQuantity: number) {
    quantity.current = newQuantity
  }

  function handleAddCartItem() {
    console.log(skuSelectsRef.current)
    console.log(!skuSelectsRef.current)
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
