import { useRouter } from 'expo-router/src/hooks'
import { ArrowLeft, Lock } from 'phosphor-react-native'
import { getTokens, Text } from 'tamagui'
import { XStack, YStack } from 'tamagui'

import { Button } from '@/components/shared/Button'
import { Logo } from '@/components/shared/Logo'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'

export function Header() {
  const router = useRouter()

  return (
    <XStack pb={12} px={SCREEN.paddingX} justifyContent="space-between">
      <XStack gap={4}>
        <Button
          background="transparent"
          alignSelf="flex-start"
          fontSize={16}
          onPress={() => router.push(ROUTES.home)}
          px={0}
        >
          <ArrowLeft color={getTokens().color.gray800.val} />
        </Button>
        <Logo />
      </XStack>
      <XStack gap={8} alignItems="center">
        <Lock color={getTokens().color.gray300.val} />
        <YStack>
          <Text color="$gray800" fontWeight="600">
            Pagamento
          </Text>
          <Text color="$gray400">100% Seguro</Text>
        </YStack>
      </XStack>
    </XStack>
  )
}
