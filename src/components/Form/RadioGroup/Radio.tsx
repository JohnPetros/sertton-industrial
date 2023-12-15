import { Circle, RadioGroup, XStack, YStack } from 'tamagui'
import { Spinner } from 'tamagui'

import { useRadio } from '@/components/Form/RadioGroup/useRadio'

interface RadioProps {
  children?: React.ReactNode
  label: React.ReactNode
  value: string
  isSelected: boolean
  isOpen: boolean
}

export function Radio({
  value,
  isSelected,
  isOpen,
  label,
  children,
}: RadioProps) {
  const { handleRadio, isLoading } = useRadio()

  return (
    <RadioGroup.Item
      unstyled
      id={value}
      flex={1}
      value={value}
      onPress={handleRadio}
      position="relative"
      disabled={isLoading}
    >
      <YStack
        borderColor={isSelected ? '$blue500' : '$gray200'}
        borderWidth={1}
        borderRadius={4}
        bg={isLoading ? '$gray200' : isOpen ? '$gray50' : '$colorTransparent'}
        p={12}
        gap={12}
      >
        {isLoading && (
          <YStack
            position="absolute"
            w="100%"
            h="100%"
            y={12}
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="large" color="$white" />
          </YStack>
        )}
        <XStack alignItems="center" gap={12}>
          <Circle w={24} h={24} bg="$gray100" borderRadius={12}>
            {isSelected && (
              <Circle
                borderWidth={8}
                w={24}
                h={24}
                borderColor="$blue400"
                bg="$colorTransparent"
              />
            )}
          </Circle>
          {label}
        </XStack>
        {isOpen || isSelected ? children : null}
      </YStack>
    </RadioGroup.Item>
  )
}
