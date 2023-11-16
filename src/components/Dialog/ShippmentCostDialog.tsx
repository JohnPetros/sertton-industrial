import { ReactNode, useState } from 'react'
import { Paragraph, Text, XStack, YStack } from 'tamagui'

import type { Address } from '@/@types/address'
import type { ShippingCosts } from '@/@types/shippingCosts'
import { Dialog } from '@/components/Dialog'

interface ShippmentCostsDialogProps {
  children: ReactNode
  shippmentsCosts: ShippingCosts | null
  onOpenChange: (isOpen: boolean) => void
}

export function ShippmentCostDialog({
  children,
  shippmentsCosts,
  onOpenChange,
}: ShippmentCostsDialogProps) {
  const [shippingServiceNames, setShippingServiceNames] = useState<string[]>([])
  const [address, setAddress] = useState<Pick<
    Address,
    'zip_code' | 'city' | 'uf'
  > | null>(null)

  function handleDialogOpenChange(isOpen: boolean) {
    onOpenChange(isOpen)

    if (isOpen && shippmentsCosts) {
      const shippingServiceNames = Object.keys(shippmentsCosts)
      setShippingServiceNames(shippingServiceNames)

      const shippmentService = shippmentsCosts[shippingServiceNames[0]]

      setAddress({
        zip_code: shippmentService.zipcode,
        city: shippmentService.city,
        uf: shippmentService.uf,
      })
    }
  }

  return (
    <Dialog
      onOpenChange={handleDialogOpenChange}
      title="Simular frete"
      content={
        <YStack>
          <XStack alignItems="center">
            <Text color="$gray700">Para o cep </Text>
            <Text color="$blue700" fontWeight="600">
              {address?.zip_code}
            </Text>
            <Text color="$gray700">
              | {address?.city} - {address?.uf}
            </Text>
          </XStack>
          <Paragraph fontSize={12} color="$gray400">
            Prazo de entrega a partir da aprovação de pagamento e envio ao
            operador logístico.
          </Paragraph>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
