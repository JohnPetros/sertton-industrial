import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import Animated from 'react-native-reanimated'
import { Portal } from '@gorhom/portal'
import { X } from 'phosphor-react-native'
import { getTokens, View, YStack } from 'tamagui'

import type { Image as ProductImageData } from '@/@types/image'
import { Button } from '@/components/Button'
import { Image } from '@/components/Product'
import { useFullImage } from '@/components/ProductPage/Image/FullImage/useFullImage'
import { SCREEN } from '@/utils/constants/screen'

const AnimatedView = Animated.createAnimatedComponent(View)

export type FullImageRef = {
  open: () => void
  close: () => void
}
interface FullImageProps {
  data: ProductImageData[]
}

const FullImageComponent = (
  { data }: FullImageProps,
  ref: ForwardedRef<FullImageRef>
) => {
  const { animatedStyle, open, close } = useFullImage()

  useImperativeHandle(ref, () => {
    return {
      open,
      close,
    }
  })

  return (
    <Portal>
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
            top={64}
            right={4}
            background="transparent"
            onPress={close}
          >
            <X size={40} color={getTokens().color.white.val} />
          </Button>
          <View mt={-100}>
            <Image
              data={data}
              size="xLarge"
              width={SCREEN.width}
              height={400}
            />
          </View>
        </YStack>
      </AnimatedView>
    </Portal>
  )
}

export const FullImage = forwardRef(FullImageComponent)
