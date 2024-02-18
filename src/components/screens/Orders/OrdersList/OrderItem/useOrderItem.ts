import { useEffect, useState } from 'react'

import { ComputedOrder } from '@/@types/computedOrder'

export function useOrderItem({ products }: Pick<ComputedOrder, 'products'>) {
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [skusAmount, setSkusAmount] = useState(0)

  function calculateTotalDiscount() {
    const totalDiscount = products.reduce((total, item) => {
      return (
        total + (item.sku.salePrice - item.sku.discountPrice) * item.quantity
      )
    }, 0)

    const subtotal = products.reduce((total, item) => {
      return total + item.sku.salePrice * item.quantity
    }, 0)

    const skusAmount = products.reduce((total, item) => {
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
