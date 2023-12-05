import { Lock } from 'phosphor-react-native'
import { getTokens, Text } from 'tamagui'
import { XStack, YStack } from 'tamagui'

import { Logo } from '@/components/Logo'
import { SCREEN } from '@/utils/constants/screen'

export default function Header() {
  return (
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
  )
}
