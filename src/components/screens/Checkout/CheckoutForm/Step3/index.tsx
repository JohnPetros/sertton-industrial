import { View, YStack } from 'tamagui'

import { Heading } from '../Heading'
import { PaymentForm } from '../PaymentForm'

import { SCREEN } from '@/utils/constants/screen'

export function Step3() {
  return (
    <YStack mx={SCREEN.paddingX} flex={1}>
      <Heading
        step={3}
        title="Pagamento"
        subtitle="Escolha uma forma de pagamento."
      />
      <View mt={24} flex={1}>
        <PaymentForm />
      </View>
    </YStack>
  )
}
