import { Minus, Plus } from 'phosphor-react-native'
import { getTokens, Text, View, XStack } from 'tamagui'

import { useNumberInput } from './useNumberInput'

import { Button } from '@/components/Button'

export interface NumberInputProps {
  label: string
  number: number
  min?: number
  max?: number
  onChangeNumber: (value: number) => void
  onReachMax?: () => void
}

export function NumberInput({
  label,
  number,
  min = 1,
  max,
  onChangeNumber,
  onReachMax,
}: NumberInputProps) {
  const { numberValue, handleDecreaseValue, handleIncreaseValue } =
    useNumberInput({ number, min, max, onChangeNumber, onReachMax })

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
