import { YStack } from 'tamagui'

import { Step1 } from '@/components/CheckoutForm/Step1'
import { Step2 } from '@/components/CheckoutForm/Step2'
import { Step3 } from '@/components/CheckoutForm/Step3'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

export function CheckoutForm() {
  const step = useCheckoutStore((store) => store.state.step)

  return (
    <>
      <YStack flex={1} bg="$white" py={12} pb={200} mt={24}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </YStack>
    </>
  )
}
