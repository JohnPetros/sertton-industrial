import { CreditCard } from 'phosphor-react-native'
import { getTokens, Text, XStack, YStack } from 'tamagui'

import { CreditCardTypes } from '@/components/shared/CreditCardTypes'

export function CreditCardLabel() {
  return (
    <YStack gap={12}>
      <XStack gap={8}>
        <CreditCard color={getTokens().color.gray800.val} />
        <Text fontWeight="600" color="$gray900">
          Cartão de Crédito
        </Text>
      </XStack>
      <XStack gap={8} flexWrap="wrap" w="90%">
        <CreditCardTypes />
      </XStack>
    </YStack>
  )
}
