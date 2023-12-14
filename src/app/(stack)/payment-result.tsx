import { useLocalSearchParams } from 'expo-router/'
import { YStack } from 'tamagui'

import { PaymentMethod } from '@/@types/paymentMethod'
import { Button } from '@/components/Button'
import { Header } from '@/components/Checkout/Header'
import { Pix } from '@/components/PaymentResult/Pix'
import { Ticket } from '@/components/PaymentResult/Ticket'

export default function PaymentResultPage() {
  const { paymentMethod } = useLocalSearchParams<{
    paymentMethod?: PaymentMethod
  }>()

  return (
    <YStack>
      <Header />
      <Ticket
        code="código"
        url={'https://www.africau.edu/images/default/sample.pdf'}
      />
      <Button>Voltar para tela principal</Button>
    </YStack>
  )
}
