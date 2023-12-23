import { useEffect, useState } from 'react'

import { Product as ProductData } from '@/@types/product'
import { useCartStore } from '@/stores/cartStore'

type Product = ProductData & { quantity: number; selectedSkuId: number }

export function useCartSummary(products: Product[]) {
  const cartItems = useCartStore((store) => store.state.items)

  const [totalToPay, setTotalToPay] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  function calculateTotals() {
    const totalToPay = products.reduce((total, product) => {
      const selectedSku = product.skus.data.find(
        (sku) => sku.id === product.selectedSkuId
      )

      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === selectedSku?.id
      )?.quantity

      if (selectedSku && quantity)
        return (
          total +
          (selectedSku.price_sale + selectedSku.price_discount) * quantity
        )
      else return total
    }, 0)

    const totalDiscount = products.reduce((total, product) => {
      const selectedSku = product.skus.data.find(
        (sku) => sku.id === product.selectedSkuId
      )

      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === selectedSku?.id
      )?.quantity

      if (selectedSku && quantity)
        return (
          total +
          (selectedSku.price_sale - selectedSku.price_discount) * quantity
        )
      else return total
    }, 0)

    const totalItems = products.reduce((total, product) => {
      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === product.selectedSkuId
      )?.quantity

      return quantity ? total + quantity : 0
    }, 0)

    setTotalToPay(totalToPay)
    setTotalDiscount(totalDiscount)
    setTotalItems(totalItems)
  }

  useEffect(() => {
    if (cartItems?.length) calculateTotals()
  }, [cartItems])

  return {
    totalToPay,
    totalDiscount,
    totalItems,
  }
}
