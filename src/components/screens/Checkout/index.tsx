import { ScrollView } from 'react-native-virtualized-view'
import { YStack } from 'tamagui'

import { CheckoutForm } from './CheckoutForm'
import { CheckoutTimer } from './CheckoutTimer'
import { Header } from './Header'
import { Steps } from './Steps'

import { CartItems } from '@/components/shared/CartItems'
import { SCREEN } from '@/utils/constants/screen'

export function Checkout() {
  return (
    <YStack flex={1}>
      <Header />

      <CheckoutTimer />

      <Steps />

      <ScrollView style={{ marginTop: 12, flex: 1 }}>
        <YStack px={SCREEN.paddingX}>
          <CartItems />
        </YStack>
        <CheckoutForm />
      </ScrollView>
    </YStack>
  )
}
