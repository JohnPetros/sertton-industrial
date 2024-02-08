import { Paragraph } from 'tamagui'
import { H1, YStack } from 'tamagui'

import { useAppError } from '@/components/shared/AppError/useAppError'
import { Button } from '@/components/shared/Button'
import { StyledSafeAreaView } from '@/components/shared/StyledSafeAreaView'
import { SCREEN } from '@/utils/constants/screen'

interface AppErrorProps {
  error: Error
  resetError: VoidFunction
}

export function AppError({ error, resetError }: AppErrorProps) {
  const { message } = useAppError(error.message)

  return (
    <StyledSafeAreaView>
      <YStack
        flex={1}
        px={SCREEN.paddingX}
        alignItems="center"
        justifyContent="center"
      >
        <YStack
          borderWidth={1}
          borderColor="$red500"
          borderRadius={4}
          p={24}
          w="100%"
          gap={24}
        >
          <H1
            color="$red500"
            fontWeight="600"
            fontSize={32}
            textAlign="center"
            lineHeight={40}
          >
            😢 Ops, temos um problema
          </H1>
          <Paragraph color="$gray500">{message}</Paragraph>
          <Button onPress={resetError}>Tentar novamente</Button>
        </YStack>
      </YStack>
    </StyledSafeAreaView>
  )
}
