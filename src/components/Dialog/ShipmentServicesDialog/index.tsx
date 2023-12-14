import { ReactNode } from 'react'
import { Paragraph, Text, XStack, YStack } from 'tamagui'

import type { ShipmentService } from '@/@types/shipmentService'
import { Dialog } from '@/components/Dialog'
import { useShipmentServicesDialog } from '@/components/Dialog/ShipmentServicesDialog/useShipmentServicesDialog'

interface ShippmentCostsDialogProps {
  children: ReactNode
  zipcode: string
  shipmentServices: ShipmentService[]
  onOpenChange: (isOpen: boolean) => void
}

export function ShipmentServicesDialog({
  children,
  zipcode,
  shipmentServices,
  onOpenChange,
}: ShippmentCostsDialogProps) {
  const { address, shipmentServicesNames, handleDialogOpenChange } =
    useShipmentServicesDialog(zipcode, shipmentServices, onOpenChange)

  return (
    <Dialog
      onOpenChange={handleDialogOpenChange}
      title="Simular frete"
      content={
        <YStack>
          <XStack alignItems="center" gap={4}>
            <Text color="$gray700">Para o cep </Text>
            <Text color="$blue500" fontWeight="600">
              {address?.zip_code}
            </Text>
            <Text color="$gray700">
              | {address?.city} - {address?.uf}
            </Text>
          </XStack>
          <Paragraph fontSize={12} mt={8} color="$gray400">
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
