import { useRouter } from 'expo-router/src/hooks'
import { ArrowLeft } from 'phosphor-react-native'
import { getTokens, H1, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Profile } from '@/components/Profile'
import { SCREEN } from '@/utils/constants/screen'

export default function ProfileScreen() {
  const router = useRouter()

  return (
    <YStack px={SCREEN.paddingX}>
      <Button
        background="transparent"
        alignSelf="flex-start"
        fontSize={16}
        onPress={router.back}
        px={0}
      >
        <ArrowLeft color={getTokens().color.gray800.val} />
        Voltar
      </Button>
      <H1 fontSize={24} color="$gray800">
        Meu cadastro
      </H1>
      <Profile />
    </YStack>
  )
}
