import { YStack } from 'tamagui'

import { Step1 } from '@/components/CheckoutForm/Step1'
import { Step2 } from '@/components/CheckoutForm/Step2'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

export function CheckoutForm() {
  const step = useCheckoutStore((store) => store.state.step)

  return (
    <>
      <YStack bg="$white" px={SCREEN.paddingX} py={12} pb={200} mt={24}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
      </YStack>
    </>
  )
}
