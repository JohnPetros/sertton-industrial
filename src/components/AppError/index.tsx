import { Text } from 'tamagui'
import { H1, YStack } from 'tamagui'

import { useAppError } from '@/components/AppError/useAppError'
import { Button } from '@/components/Button'
import { Strong } from '@/components/Strong'
import { StyledSafeAreaView } from '@/components/StyledSafeAreaView'
import { SCREEN } from '@/utils/constants/screen'

interface AppErrorProps {
  error: Error
  resetError: VoidFunction
}

export function AppError({ error, resetError }: AppErrorProps) {
  const { message, statusCode } = useAppError(error.message)

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
          <Strong>
            {message}.{`\n`}Código do erro: {statusCode}
          </Strong>
          <Button onPress={resetError}>Tentar novamente</Button>
        </YStack>
      </YStack>
    </StyledSafeAreaView>
  )
}
