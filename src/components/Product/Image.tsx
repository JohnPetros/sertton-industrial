import { ViewProps } from 'react-native'
import { Image as TImage, View } from 'tamagui'

import type { Image as ProductImageData, ImageSize } from '@/@types/product'

interface ImageProps extends ViewProps {
  data: ProductImageData[]
  size: ImageSize
  width: number
  height: number
}

export function Image({ data, size }: ImageProps) {
  const image = data[0][size]

  return (
    <View
      borderRadius={4}
      bg="$white"
      alignItems="center"
      justifyContent="center"
      w={150}
      h={180}
    >
      <TImage source={{ uri: image.url }} w={64} h={64} />
    </View>
  )
}
