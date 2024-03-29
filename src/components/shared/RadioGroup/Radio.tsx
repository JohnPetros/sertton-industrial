import { memo } from 'react'
import { Circle, RadioGroup, XStack, YStack } from 'tamagui'
import { Spinner } from 'tamagui'

import { useRadio } from './useRadio'

type RadioProps = {
  children?: React.ReactNode
  label: React.ReactNode
  value: string
  isSelected: boolean
  isOpen: boolean
}

export function RadioComponent({
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
      testID={`radio-${value}`}
      id={value}
      value={value}
      onPress={handleRadio}
      position="relative"
      disabled={isLoading}
      flex={1}
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

export const Radio = memo(RadioComponent, (previousProps, currentProps) => {
  return previousProps.isSelected === currentProps.isSelected
})
