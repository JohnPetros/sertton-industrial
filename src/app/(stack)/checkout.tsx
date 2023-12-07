import { ScrollView } from 'react-native-virtualized-view'
import { YStack } from 'tamagui'

import { CartItems } from '@/components/Checkout/CartItems'
import { CheckoutTimer } from '@/components/Checkout/CheckoutTimer'
import { Header } from '@/components/Checkout/Header'
import { Steps } from '@/components/Checkout/Steps'
import { CheckoutForm } from '@/components/CheckoutForm'
import { SCREEN } from '@/utils/constants/screen'

export default function checkout() {
  return (
    <YStack>
      <Header />

      <CheckoutTimer />

      <Steps />

      <ScrollView style={{ marginTop: 12 }}>
        <YStack px={SCREEN.paddingX}>
          <CartItems />
        </YStack>
        <CheckoutForm />
      </ScrollView>
    </YStack>
  )
}
