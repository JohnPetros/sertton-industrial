import { useRouter } from 'expo-router/src/hooks'
import { ArrowLeft } from 'phosphor-react-native'
import { getTokens } from 'tamagui'

import { Button } from '@/components/Button'

export function BackButton() {
  const router = useRouter()

  return (
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
  )
}
