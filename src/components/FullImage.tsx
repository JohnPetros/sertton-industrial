import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
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

export type FullImageRef = {
  open: () => void
  close: () => void
}
interface FullImageProps {
  data: ProductImageData[]
}

export const FullImageComponent = (
  { data }: FullImageProps,
  ref: ForwardedRef<FullImageRef>
) => {
  const [isVisible, setIsVisible] = useState(false)

  const positionX = useSharedValue(SCREEN.width)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: positionX.value }],
    }
  })

  function open() {
    setIsVisible(true)
  }

  function close() {
    setIsVisible(false)
  }

  useImperativeHandle(ref, () => {
    return {
      open,
      close,
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
      zIndex={100}
      justifyContent="center"
      alignItems="center"
      bg="$gray900"
      style={animatedStyle}
    >
      <YStack
        flex={1}
        position="relative"
        zIndex={1000}
        justifyContent="center"
      >
        <Button
          position="absolute"
          top={24}
          right={4}
          background="transparent"
          onPress={close}
        >
          <X size={40} color={getTokens().color.white.val} />
        </Button>
        <View mt={-100}>
          <Image data={data} size="xLarge" width={SCREEN.width} height={300} />
        </View>
      </YStack>
    </AnimatedView>
  )
}

export const FullImage = forwardRef(FullImageComponent)
