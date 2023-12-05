import { Clock } from 'phosphor-react-native'
import { getTokens, Text, XStack } from 'tamagui'

import { Timer } from '@/components/Timer'

export function CheckoutTimer() {
  return (
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
  )
}
