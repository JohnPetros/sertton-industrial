import { ScrollView } from 'react-native-virtualized-view'
import { Clock, Lock } from 'phosphor-react-native'
import { getTokens, Text, XStack, YStack } from 'tamagui'

import { CartItems } from '@/components/CartItems'
import { CheckoutForm } from '@/components/CheckoutForm'
import { Logo } from '@/components/Logo'
import { Step } from '@/components/Step'
import { Timer } from '@/components/Timer'
import { SCREEN } from '@/utils/constants/screen'

const STEP_GAP = 12
const STEP_WIDTH = (SCREEN.width - SCREEN.paddingX * 2) / 3 - STEP_GAP

export default function checkout() {
  return (
    <YStack pb={24}>
      <XStack pb={12} px={SCREEN.paddingX} justifyContent="space-between">
        <Logo />
        <XStack gap={8} alignItems="center">
          <Lock color={getTokens().color.gray300.val} />
          <YStack>
            <Text color="$gray800" fontWeight="600">
              Pagamento
            </Text>
            <Text color="$gray300">100%</Text>
          </YStack>
        </XStack>
      </XStack>

      <XStack
        gap={12}
        py={8}
        alignItems="center"
        justifyContent="center"
        bg="$blue700"
      >
        <Clock color={getTokens().color.white.val} />
        <Text
          textTransform="uppercase"
          color="$white"
          fontSize={20}
          fontWeight="600"
        >
          Oferta termina em
        </Text>
        <Timer
          initialHours={0}
          initialMinutes={15}
          initialSeconds={0}
          color="secondary"
          fontSize={20}
        />
      </XStack>

      <XStack
        w={SCREEN.width}
        mt={12}
        px={SCREEN.paddingX}
        justifyContent="space-between"
      >
        <Step number={1} width={STEP_WIDTH} isActive={true} label="Cadastro" />
        <Step number={2} width={STEP_WIDTH} isActive={false} label="Entrega" />
        <Step
          number={3}
          width={STEP_WIDTH}
          isActive={false}
          label="Pagamento"
        />
      </XStack>

      <ScrollView style={{ marginTop: 12 }}>
        <YStack px={SCREEN.paddingX}>
          <CartItems />
        </YStack>
        <CheckoutForm />
      </ScrollView>
    </YStack>
  )
}
