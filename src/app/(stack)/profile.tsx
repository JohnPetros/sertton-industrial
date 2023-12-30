import { useRouter } from 'expo-router/src/hooks'
import { User } from 'phosphor-react-native'
import { H1, YStack } from 'tamagui'

import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { EmptyItemsMessage } from '@/components/EmptyItemsMessage'
import { Profile } from '@/components/Profile'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { SCREEN } from '@/utils/constants/screen'

export default function ProfileScreen() {
  const router = useRouter()
  const { customer } = useCustomerContext()

  return (
    <YStack px={SCREEN.paddingX} flex={1}>
      <BackButton />
      <H1 fontSize={24} color="$gray800">
        Meu cadastro
      </H1>
      {!customer && (
        <EmptyItemsMessage
          title="Cadastro não encontrado"
          icon={User}
          callback={
            <Button onPress={router.back}>Voltar para o aplicativo</Button>
          }
        />
      )}
      {customer && <Profile />}
    </YStack>
  )
}
