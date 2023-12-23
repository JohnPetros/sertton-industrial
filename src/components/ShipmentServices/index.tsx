import { Truck } from 'phosphor-react-native'
import { getTokens, XStack } from 'tamagui'

import type { ComputedSku } from '@/@types/computedSku'
import { Button } from '@/components/Button'
import { ShipmentServicesDialog } from '@/components/Dialog/ShipmentServicesDialog'
import { Input } from '@/components/Form/Input'
import { useShipmentServices } from '@/components/ShipmentServices/useShipmentServices'
import { SCREEN } from '@/utils/constants/screen'

const BUTTON_WIDTH = 48
const GAP = 8
const INPUT_WIDTH = SCREEN.width - BUTTON_WIDTH - GAP - SCREEN.paddingX * 2

interface ShipmentServicesProps {
  product: ComputedSku
}

export function ShipmentServices({ product }: ShipmentServicesProps) {
  const {
    shipmentServices,
    zipcode,
    handleZipcodeChange,
    handleShipmentServicesDialogOpenChange,
    handleCalculateShipmentServices,
  } = useShipmentServices(product)

  return (
    <XStack gap={8} alignItems="flex-end" justifyContent="center">
      <Input
        keyboardType="numeric"
        w={INPUT_WIDTH}
        label="Calcular frete"
        placeholder="Ex.: 00000-0000"
        value={zipcode}
        onChangeText={handleZipcodeChange}
        mask="cep"
      />
      <ShipmentServicesDialog
        onOpenChange={handleShipmentServicesDialogOpenChange}
        zipcode={zipcode}
        shipmentServices={shipmentServices}
      >
        <Button
          icon={<Truck size={24} color={getTokens().color.white.val} />}
          w={BUTTON_WIDTH}
          onPress={handleCalculateShipmentServices}
        />
      </ShipmentServicesDialog>
    </XStack>
  )
}
