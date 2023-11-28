import { YStack } from 'tamagui'

import { Step1 } from '@/components/CheckoutForm/Step1'
import { KeyboardHandlerView } from '@/components/KeyboardHandlerView'
import { SCREEN } from '@/utils/constants/screen'

export function CheckoutForm() {
  return (
    <KeyboardHandlerView>
      <YStack bg="$white" px={SCREEN.paddingX} py={12} mt={24}>
        <Step1 />
      </YStack>
    </KeyboardHandlerView>
  )
}
