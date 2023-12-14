import { useEffect, useState } from 'react'
import { Truck } from 'phosphor-react-native'
import { getTokens, XStack } from 'tamagui'

import { Button } from '@/components/Button'
import { ShippmentCostDialog } from '@/components/Dialog/ShippmentCostDialog'
import { Input } from '@/components/input'
import { useShippingCosts } from '@/hooks/useShippingCosts'
import { SCREEN } from '@/utils/constants/screen'

const BUTTON_WIDTH = 48
const GAP = 8
const INPUT_WIDTH = SCREEN.width - BUTTON_WIDTH - GAP - SCREEN.paddingX * 2

interface ShippingCostsCalculationCostsProps {
  total: number
  skus_ids: number[]
  quantities: number[]
}

export default function ShippingCostsCalculation({
  quantities,
  skus_ids,
  total,
}: ShippingCostsCalculationCostsProps) {
  const [zipcode, setZipcode] = useState('')
  const [shouldCalculate, setShouldCalculate] = useState(false)
  const { shippingCosts } = useShippingCosts(
    {
      zipcode,
      quantities,
      skus_ids,
      total,
    },
    shouldCalculate
  )

  function handleCalculateShippingCosts() {
    setShouldCalculate(true)
  }

  function handleSippingCostsDialogOpenChange(isOpen: boolean) {
    setShouldCalculate(isOpen)
  }

  useEffect(() => {
    if (shouldCalculate && shippingCosts) setShouldCalculate(false)
  }, [shouldCalculate, shippingCosts])

  return (
    <XStack gap={8} alignItems="flex-end" justifyContent="center">
      <Input
        keyboardType="numeric"
        w={INPUT_WIDTH}
        label="Calcular frete"
        placeholder="Ex.: 00000-0000"
        value={zipcode}
        onChangeText={setZipcode}
        mask="cep"
      />
      <ShippmentCostDialog
        onOpenChange={handleSippingCostsDialogOpenChange}
        shippmentsCosts={shippingCosts ?? null}
      >
        <Button
          icon={<Truck size={24} color={getTokens().color.white.val} />}
          w={BUTTON_WIDTH}
          onPress={handleCalculateShippingCosts}
        />
      </ShippmentCostDialog>
    </XStack>
  )
}
