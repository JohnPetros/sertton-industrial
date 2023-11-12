import { Dimensions } from 'react-native'
import { Truck } from 'phosphor-react-native'
import { getTokens, XStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Input } from '@/components/input'

const SCREEN_WIDTH = Dimensions.get('screen').width
const BUTTON_WIDTH = 48
const PADDING_X = 24
const GAP = 8
const INPUT_WIDTH = SCREEN_WIDTH - BUTTON_WIDTH - GAP - PADDING_X * 2

export default function ShipmentCalculation() {
  return (
    <XStack gap={8} alignItems="flex-end" justifyContent="center">
      <Input
        keyboardType="numeric"
        w={INPUT_WIDTH}
        label="Calcular frete"
        placeholder="Ex.: 00000-0000 "
      />
      <Button
        icon={<Truck size={24} color={getTokens().color.white.val} />}
        w={BUTTON_WIDTH}
      />
    </XStack>
  )
}
