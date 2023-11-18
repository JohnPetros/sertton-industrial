import { useId, useState } from 'react'
import { Check } from 'phosphor-react-native'
import { Checkbox as Box, getTokens, Label, XStack } from 'tamagui'

interface CheckboxProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function Checkbox({ label, value, onChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false)
  const id = useId()

  function handleCheckedChange(isChecked: boolean) {
    setIsChecked(isChecked)
    onChange(value)
  }
  return (
    <XStack gap={12}>
      <Box
        id={id}
        borderRadius={2}
        value={value}
        onCheckedChange={handleCheckedChange}
        bg={isChecked ? '$blue400' : '$colorTransparent'}
        size="$5"
      >
        <Box.Indicator>
          <Check color={getTokens().color.white.val} />
        </Box.Indicator>
      </Box>
      <Label htmlFor={id}>{label}</Label>
    </XStack>
  )
}
