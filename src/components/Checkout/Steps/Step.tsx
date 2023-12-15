import { Button, Text, View, XStack, YStack } from 'tamagui'

import { useStep } from '@/components/Checkout/Steps/useStep'

interface StepProps {
  label: string
  number: number
  width: number
  isActive: boolean
}

const GAP = 8

export function Step({ number, label, width, isActive }: StepProps) {
  const { handleStep, color } = useStep(isActive)

  return (
    <Button unstyled onPress={() => handleStep(number)}>
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
          >
            <Text color="$white" fontWeight="600">
              {number}
            </Text>
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
