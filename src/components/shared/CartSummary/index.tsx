import { ComputedProduct } from '@/@types/computedProduct'
import { useCartSummary } from '@/components/shared/CartSummary/useCartSummary'
import { Summary } from '@/components/shared/Summary'

interface CartSummaryProps {
  items: ComputedProduct[]
  shipment?: number
}

export function CartSummary({ items, shipment = 0 }: CartSummaryProps) {
  const { subtotal, totalDiscount, totalItems, totalToPay } =
    useCartSummary(items)

  return (
    <Summary
      subtotal={subtotal}
      itemsAmount={totalItems}
      discount={totalDiscount}
      total={totalToPay + shipment}
      shipment={shipment}
    />
  )
}
