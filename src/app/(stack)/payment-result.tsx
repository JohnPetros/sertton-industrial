import { useLocalSearchParams, useRouter } from 'expo-router/'
import { YStack } from 'tamagui'

import { PaymentMethod } from '@/@types/paymentMethod'
import { Button } from '@/components/Button'
import { Header } from '@/components/Checkout/Header'
import { Pix } from '@/components/PaymentResult/Pix'
import { Ticket } from '@/components/PaymentResult/Ticket'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'

export default function PaymentResultPage() {
  const { paymentMethod } = useLocalSearchParams<{
    paymentMethod?: PaymentMethod
  }>()
  const router = useRouter()

  if (paymentMethod)
    return (
      <YStack>
        <Header />
        <YStack px={SCREEN.paddingX}>
          {paymentMethod === 'ticket' && <Ticket />}
          {paymentMethod === 'pix' && <Pix />}
          <Button mt={24} onPress={() => router.push(ROUTES.home)}>
            Voltar para tela principal
          </Button>
        </YStack>
      </YStack>
    )
}
