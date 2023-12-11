import { Circle, RadioGroup, XStack, YStack } from 'tamagui'

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
  return (
    <RadioGroup.Item
      unstyled
      id={value}
      flex={1}
      value={value}
      onPress={() => console.log('888')}
    >
      <YStack
        borderColor={isSelected ? '$blue500' : '$gray200'}
        borderWidth={1}
        borderRadius={4}
        bg={isOpen ? '$gray50' : '$colorTransparent'}
        p={12}
        gap={12}
      >
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
