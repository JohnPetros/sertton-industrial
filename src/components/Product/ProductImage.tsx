import { Image, View } from 'tamagui'

import type { Image as ProductImageData, ImageSize } from '@/@types/product'

interface ProductImageProps {
  data: ProductImageData[]
  size: ImageSize
}

export function ProductImage({ data, size }: ProductImageProps) {
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
      <Image source={{ uri: image.url }} w={64} h={64} />
    </View>
  )
}
