import { Button, Text, View, XStack, YStack } from 'tamagui'
import { Spinner } from 'tamagui'

import { useStep } from './useStep'

type StepProps = {
  label: string
  number: number
  width: number
  isActive: boolean
}

const GAP = 8

export function Step({ number, label, width, isActive }: StepProps) {
  const { handleStep, isLoading, color } = useStep(isActive)

  return (
    <Button
      testID="step-button"
      unstyled
      disabled={!isActive}
      onPress={() => handleStep(number)}
    >
      <YStack gap={2} w={width + GAP} alignItems="center">
        <XStack gap={GAP} justifyContent="center" alignItems="center">
          <View bg={color} h={12} flex={1} borderRadius={8} />
          <View
            w={32}
            h={32}
            alignItems="center"
            justifyContent="center"
            borderRadius={16}
            bg={color}
            testID="step-circle"
          >
            {isLoading ? (
              <Spinner testID="spinner" color="$white" />
            ) : (
              <Text color="$white" fontWeight="600">
                {number}
              </Text>
            )}
          </View>
          <View bg={color} h={12} flex={1} borderRadius={8} />
        </XStack>
        <Text textAlign="center" color="$gray400">
          {label}
        </Text>
      </YStack>
    </Button>
  )
}
