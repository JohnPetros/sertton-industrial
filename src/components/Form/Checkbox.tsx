import { useId, useState } from 'react'
import { Check } from 'phosphor-react-native'
import { Checkbox as Box, getTokens, Label, XStack } from 'tamagui'

interface CheckboxProps {
  label: string
  value: string
  defaultChecked: boolean
  onChange: (value: string, isChecked: boolean) => void
}

export function Checkbox({
  label,
  value,
  defaultChecked,
  onChange,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked)
  const id = useId()

  function handleCheckedChange(isChecked: boolean) {
    setIsChecked(isChecked)
    onChange(value, isChecked)
  }
  return (
    <XStack alignItems="center">
      <Box
        id={id}
        borderRadius={2}
        value={value}
        onCheckedChange={handleCheckedChange}
        bg={isChecked ? '$blue400' : '$colorTransparent'}
        size="$5"
        checked={isChecked}
      >
        <Box.Indicator>
          <Check color={getTokens().color.white.val} />
        </Box.Indicator>
      </Box>
      <Label htmlFor={id} p={8}>
        {label}
      </Label>
    </XStack>
  )
}
