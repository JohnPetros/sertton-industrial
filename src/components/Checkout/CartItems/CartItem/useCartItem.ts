import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import type { Sku } from '@/@types/sku'
import { useToast } from '@/components/Toast/useToast'
import { useCartStore } from '@/stores/cartStore'

export function useCartItem(skus: Sku[], selectedSkuId: number) {
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)

  const removeItem = useCartStore((store) => store.actions.removeItem)
  const setItemQuantity = useCartStore((store) => store.actions.setItemQuantity)

  const setQuantityDebounce = useDebouncedCallback((newQuantity) => {
    if (selectedSku && newQuantity <= selectedSku.total_in_stock) {
      setItemQuantity(selectedSku.id, newQuantity)
    }
  }, 700)

  const toast = useToast()

  function handleQuantityChange(newQuantity: number) {
    setQuantityDebounce(newQuantity)
  }

  function handleRemoveItem() {
    if (selectedSku) removeItem(selectedSku.id)
  }

  function handleReachMaxInStock() {
    if (selectedSku)
      toast.show(
        `Quantidade indisponível.\nDisponível em estoque: ${selectedSku.total_in_stock}`,
        'error'
      )
  }

  function selectSku() {
    const selectedSku = skus.find((sku) => sku.id === selectedSkuId)

    if (selectedSku) setSelectedSku(selectedSku)
  }

  useEffect(() => {
    selectSku()
  }, [])

  return {
    selectedSku,
    handleQuantityChange,
    handleRemoveItem,
    handleReachMaxInStock,
  }
}
