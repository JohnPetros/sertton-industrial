import { Button, YStack } from 'tamagui'

import { Step1 } from '@/components/CheckoutForm/Step1'
import { Step2 } from '@/components/CheckoutForm/Step2'
import { Step3 } from '@/components/CheckoutForm/Step3'
import { useCheckoutForm } from '@/components/CheckoutForm/useCheckoutForm'
import { EmailDialog } from '@/components/Dialog/EmailDialog'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function CheckoutForm() {
  const step = useCheckoutStore((store) => store.state.step)
  const { emailDialogRef, handleEmailDialogFallback } = useCheckoutForm()

  return (
    <>
      <EmailDialog
        label="Identifique-se"
        ref={emailDialogRef}
        fallback={
          <Button unstyled color="$blue500" onPress={handleEmailDialogFallback}>
            Continuar sem usar dados de cadastro
          </Button>
        }
      />
      <YStack flex={1} bg="$white" py={12} mt={24}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 3 && <Step3 />}
      </YStack>
    </>
  )
}
