import { useLocalSearchParams } from 'expo-router/'
import { YStack } from 'tamagui'

import { PaymentMethod } from '@/@types/paymentMethod'
import Ticket from '@/components/PaymentResult/Ticket'

export default function PaymentResultPage() {
  const { paymentMethod } = useLocalSearchParams<{
    paymentMethod?: PaymentMethod
  }>()

  return <YStack>{paymentMethod === 'ticket' && <Ticket />}</YStack>
}
