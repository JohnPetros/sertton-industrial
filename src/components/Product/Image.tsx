import { ViewProps } from 'react-native'
import { Image as TImage, View } from 'tamagui'

import type { ImageSize } from '@/@types/productImage'

const sizes: Record<ImageSize, number> = {
  xLarge: 340,
  large: 240,
  medium: 120,
  small: 100,
  thumb: 64,
}

interface ImageProps extends ViewProps {
  url: string
  size: ImageSize
  width: number
  height: number
}

export function Image({ url, size, width, height }: ImageProps) {
  return (
    <View
      borderRadius={4}
      bg="$white"
      alignItems="center"
      justifyContent="center"
      w={width}
      h={height}
    >
      <TImage
        source={{ uri: url }}
        w={sizes[size]}
        h={sizes[size]}
        resizeMode="contain"
      />
    </View>
  )
}

/**
 * import { ViewProps } from 'react-native'
import { Image as TImage, View } from 'tamagui'

import type { Image as ProductImageData, ImageSize } from '@/@types/image'

const sizes: Record<ImageSize, number> = {
  xLarge: 340,
  large: 240,
  medium: 120,
  small: 100,
  thumb: 64,
}

interface ImageProps extends ViewProps {
  data: ProductImageData[]
  size: ImageSize
  width: number
  height: number
}

export function Image({ data, size, width, height }: ImageProps) {
  const image = data[0].medium

  return (
    <View
      borderRadius={4}
      bg="$white"
      alignItems="center"
      justifyContent="center"
      w={width}
      h={height}
    >
      <TImage
        source={{ uri: image.url }}
        w={sizes[size]}
        h={sizes[size]}
        resizeMode="contain"
      />
    </View>
  )
}
 */
