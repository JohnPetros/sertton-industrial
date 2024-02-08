import { useLocalSearchParams, useRouter } from 'expo-router/'
import { YStack } from 'tamagui'

import { Header } from '../Checkout/Header'

import { Pix } from './Pix'
import { Ticket } from './Ticket'

import { PaymentMethod } from '@/@types/paymentMethod'
import { Button } from '@/components/shared/Button'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'

export function PaymentResult() {
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
