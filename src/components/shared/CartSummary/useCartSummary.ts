import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { ComputedProduct } from '@/@types/computedProduct'
import { useAppError } from '@/components/shared/AppError/useAppError'
import { useApi } from '@/services/api'
import { useCartStore } from '@/stores/cartStore'

export function useCartSummary(products: ComputedProduct[]) {
  const cartItems = useCartStore((store) => store.state.items)
  const api = useApi()
  const { throwAppError } = useAppError()

  const { data: discounts } = useQuery('discounts', () => api.getDiscounts(), {
    onError: (error) => {
      api.handleError(error)
      throwAppError('Erro ao calcular desconto de compra')
    },
  })

  const [subtotal, setSubtotal] = useState(0)
  const [totalToPay, setTotalToPay] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  function calculateTotals() {
    const totalProductsToPay = products.reduce((total, product) => {
      const selectedSku = product.skus.find(
        (sku) => sku.id === product.selectedSkuId
      )

      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === selectedSku?.id
      )?.quantity

      if (selectedSku && quantity)
        return total + selectedSku.salePrice * quantity
      else return total
    }, 0)

    const totalProductsDiscount = products.reduce((total, product) => {
      const selectedSku = product.skus.find(
        (sku) => sku.id === product.selectedSkuId
      )

      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === selectedSku?.id
      )?.quantity

      if (selectedSku && quantity)
        return (
          total + (selectedSku.salePrice - selectedSku.discountPrice) * quantity
        )
      else return total
    }, 0)

    const totalItems = products.reduce((total, product) => {
      const quantity = cartItems.find(
        (cartItem) => cartItem.skuId === product.selectedSkuId
      )?.quantity

      return quantity ? total + quantity : 0
    }, 0)

    const totalToPay = totalProductsToPay - totalProductsDiscount

    let totalDiscount = totalProductsDiscount

    if (discounts) {
      for (const discount of discounts) {
        if (totalToPay - totalProductsDiscount >= discount.min_value)
          totalDiscount = totalDiscount + totalToPay * (discount.percent / 100)
      }
    }

    setTotalDiscount(totalDiscount)
    setSubtotal(totalProductsToPay)
    setTotalToPay(totalProductsToPay - totalDiscount)
    setTotalItems(totalItems)
  }

  useEffect(() => {
    if (cartItems?.length) calculateTotals()
  }, [cartItems])

  return {
    subtotal,
    totalToPay,
    totalDiscount,
    totalItems,
  }
}
