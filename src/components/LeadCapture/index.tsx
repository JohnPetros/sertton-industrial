import { H2, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Input } from '@/components/Form/Input'
import { useLeadsCapture } from '@/components/LeadCapture/useLeadsCapture'
import { SCREEN } from '@/utils/constants/screen'

export function LeadCapture() {
  const { email, error, handleEmailChange, handleSubmit } = useLeadsCapture()

  return (
    <YStack gap={24} bg="$white" py={32} px={SCREEN.paddingX}>
      <H2 fontSize={24} color="$blue500">
        Receba novidades e ofertas incríveis
      </H2>
      <Input
        value={email}
        onChangeText={handleEmailChange}
        error={error}
        placeholder="Digite seu e-mail"
      />
      <Button onPress={handleSubmit}>Inscrever-se</Button>
    </YStack>
  )
}
