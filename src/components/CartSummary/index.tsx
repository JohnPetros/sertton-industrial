import { ComputedProduct } from '@/@types/computedProduct'
import { useCartSummary } from '@/components/CartSummary/useCartSummary'
import { Summary } from '@/components/Summary'

interface CartSummaryProps {
  items: ComputedProduct[]
}

export function CartSummary({ items }: CartSummaryProps) {
  const { totalDiscount, totalItems, totalToPay } = useCartSummary(items)

  return (
    <Summary
      subtotal={totalToPay + totalDiscount}
      itemsAmount={totalItems}
      total={totalToPay}
      discount={totalDiscount}
    />
  )
}
