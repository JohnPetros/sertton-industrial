import { Toast as T, useToastState } from '@tamagui/toast'
import { Truck } from 'phosphor-react-native'
import { getTokens, Square, XStack } from 'tamagui'

import { SCREEN } from '@/utils/constants/screen'

export function Toast() {
  const toast = useToastState()

  if (!toast || toast.isHandledNatively) return null

  return (
    <T
      key={toast.id}
      type="background"
      duration={toast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={24}
      opacity={1}
      scale={1}
      animation="bouncy"
      zIndex={150}
      backgroundColor="$blue5"
      testID="toast"
    >
      <XStack alignItems="center" flex={1} br={12} w={SCREEN.width}>
        <Square alignItems="center" justifyContent="center">
          <Truck color={getTokens().color.white.val} size={28} />
        </Square>
        <T.Title color="$blue12" fontSize={16} textAlign="center">
          {toast.title}
        </T.Title>
      </XStack>
    </T>
  )
}
