import React from 'react'
import { XStack } from 'tamagui'

import { Step } from '@/components/Checkout/Steps/Step'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

const STEP_GAP = 12
const STEP_WIDTH = (SCREEN.width - SCREEN.paddingX * 2) / 3 - STEP_GAP

export function Steps() {
  const currentStep = useCheckoutStore((store) => store.state.step)

  return (
    <XStack
      w={SCREEN.width}
      mt={12}
      px={SCREEN.paddingX}
      justifyContent="space-between"
    >
      <Step
        number={1}
        width={STEP_WIDTH}
        isActive={currentStep >= 1}
        label="Cadastro"
      />
      <Step
        number={2}
        width={STEP_WIDTH}
        isActive={currentStep >= 2}
        label="Entrega"
      />
      <Step
        number={3}
        width={STEP_WIDTH}
        isActive={currentStep >= 3}
        label="Pagamento"
      />
    </XStack>
  )
}
