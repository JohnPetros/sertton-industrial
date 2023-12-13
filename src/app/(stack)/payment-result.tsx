import { useLocalSearchParams } from 'expo-router/'
import { YStack } from 'tamagui'

import { PaymentMethod } from '@/@types/paymentMethod'
import { Header } from '@/components/Checkout/Header'
import { Pix } from '@/components/PaymentResult/Pix'
import { Ticket } from '@/components/PaymentResult/Ticket'
import { SCREEN } from '@/utils/constants/screen'

export default function PaymentResultPage() {
  const { paymentMethod } = useLocalSearchParams<{
    paymentMethod?: PaymentMethod
  }>()

  return (
    <YStack>
      <Header />
      <Pix />
    </YStack>
  )
}
