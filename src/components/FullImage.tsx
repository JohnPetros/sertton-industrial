import { X } from 'phosphor-react-native'
import { getTokens, View, YStack } from 'tamagui'

import type { Image as ProductImageData } from '@/@types/image'
import { Button } from '@/components/Button'
import { Image } from '@/components/Product'
import { SCREEN } from '@/utils/constants/screen'

interface FullImageProps {
  data: ProductImageData[]
}

export function FullImage({ data }: FullImageProps) {
  return (
    <View
      flex={1}
      top={0}
      left={0}
      right={0}
      bottom={0}
      position="absolute"
      zIndex={200}
      bg="$gray900"
    >
      <YStack position="relative" flex={1} justifyContent="center">
        <Button position="absolute" top={24} right={4} background="transparent">
          <X size={40} color={getTokens().color.white.val} />
        </Button>
        <Image data={data} size="xLarge" width={SCREEN.width} height={300} />
      </YStack>
    </View>
  )
}
