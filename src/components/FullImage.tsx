import { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { X } from 'phosphor-react-native'
import { getTokens, View, YStack } from 'tamagui'

import type { Image as ProductImageData } from '@/@types/image'
import { Button } from '@/components/Button'
import { Image } from '@/components/Product'
import { SCREEN } from '@/utils/constants/screen'

const AnimatedView = Animated.createAnimatedComponent(View)
const ANIMATION_DURATION = 400

interface FullImageProps {
  data: ProductImageData[]
  isVisible: boolean
  close: () => void
}

export function FullImage({ data, isVisible, close }: FullImageProps) {
  const positionX = useSharedValue(SCREEN.width)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
    }
  })

  useEffect(() => {
    if (isVisible) {
      positionX.value = withTiming(0, { duration: ANIMATION_DURATION })
      return
    }

    positionX.value = withTiming(SCREEN.width, { duration: ANIMATION_DURATION })
  }, [isVisible])

  return (
    <AnimatedView
      flex={1}
      top={0}
      left={0}
      right={0}
      bottom={0}
      position="absolute"
      zIndex={200}
      bg="$gray900"
      style={animatedStyle}
    >
      <YStack position="relative" flex={1} justifyContent="center">
        <Button
          position="absolute"
          top={24}
          right={4}
          background="transparent"
          onPress={close}
        >
          <X size={40} color={getTokens().color.white.val} />
        </Button>
        <Image data={data} size="xLarge" width={SCREEN.width} height={300} />
      </YStack>
    </AnimatedView>
  )
}
