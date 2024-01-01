import { View, YStack } from 'tamagui'

import { PaymentForm } from '@/components/Checkout/PaymentForm'
import { Heading } from '@/components/CheckoutForm/Heading'
import { SCREEN } from '@/utils/constants/screen'

export function Step3() {
  return (
    <YStack>
      <YStack mx={SCREEN.paddingX}>
        <Heading
          step={3}
          title="Pagamento"
          subtitle="Escolha uma forma de pagamento."
        />
        <View mt={24}>
          <PaymentForm />
        </View>
      </YStack>
    </YStack>
  )
}
