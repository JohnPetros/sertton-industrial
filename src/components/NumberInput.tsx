import { useEffect, useState } from 'react'
import { Minus, Plus } from 'phosphor-react-native'
import { getTokens, Text, View, XStack } from 'tamagui'

import { Button } from '@/components/Button'

interface NumberInputProps {
  label: string
  number: number
  onChangeNumber: (value: number) => void
}

export function NumberInput({
  label,
  number,
  onChangeNumber,
}: NumberInputProps) {
  const [numberValue, setNumberValue] = useState(number ?? 1)

  function handleDecreaseValue() {
    const updatedNumber = numberValue - 1

    if (updatedNumber >= 1) {
      setNumberValue(updatedNumber)
    }
  }

  function handleIncreaseValue() {
    const updatedNumber = numberValue + 1
    setNumberValue(updatedNumber)
  }

  useEffect(() => {
    onChangeNumber(numberValue)
  }, [numberValue])

  return (
    <XStack gap={12} alignItems="center" justifyContent="center">
      <Button
        w={24}
        icon={<Minus size={16} color={getTokens().color.white.val} />}
        onPress={handleDecreaseValue}
      />

      <View
        bg="$gray100"
        borderRadius={4}
        alignItems="center"
        justifyContent="center"
        w={64}
        h={44}
        aria-label={label}
      >
        <Text fontSize={16}>{numberValue}</Text>
      </View>
      <Button
        w={24}
        icon={<Plus size={16} color={getTokens().color.white.val} />}
        onPress={handleIncreaseValue}
      />
    </XStack>
  )
}
