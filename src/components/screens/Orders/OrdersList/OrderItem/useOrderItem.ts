import { useEffect, useState } from 'react'

import type { YampiComputedOrder } from '@/services/api/yampi/types/YampiComputedOrder'

export function useOrderItem(order: YampiComputedOrder) {
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [skusAmount, setSkusAmount] = useState(0)

  function calculateTotalDiscount() {
    const totalDiscount = order.items.data.reduce((total, item) => {
      return (
        total +
        (item.sku.data.price_sale - item.sku.data.price_discount) *
          item.quantity
      )
    }, 0)

    const subtotal = order.items.data.reduce((total, item) => {
      return total + item.sku.data.price_sale * item.quantity
    }, 0)

    const skusAmount = order.items.data.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    setTotalDiscount(totalDiscount)
    setSubtotal(subtotal)
    setSkusAmount(skusAmount)
  }

  useEffect(() => {
    calculateTotalDiscount()
  }, [])

  return {
    subtotal,
    totalDiscount,
    skusAmount,
  }
}
