import { ArrowsOut } from 'phosphor-react-native'
import { getTokens, View, YStack } from 'tamagui'

import { Image as ProductImage } from '@/@types/image'
import { Button } from '@/components/Button'
import { Image as Img } from '@/components/Product'
import { FullImage } from '@/components/ProductPage/Image/FullImage'
import { useImage } from '@/components/ProductPage/Image/useImage'
import { SCREEN } from '@/utils/constants/screen'

interface FullImageProps {
  data: ProductImage[]
}

export function Image({ data }: FullImageProps) {
  const { fullImageRef, handleFullImage } = useImage()

  return (
    <YStack>
      <FullImage ref={fullImageRef} data={data} />
      <View
        position="relative"
        mt={24}
        onStartShouldSetResponder={() => {
          handleFullImage()
          return true
        }}
      >
        {data && (
          <Img data={data} size="large" width={SCREEN.width} height={224} />
        )}

        <Button
          position="absolute"
          zIndex={50}
          background="transparent"
          fontSize={12}
        >
          <ArrowsOut size={16} color={getTokens().color.gray800.val} />
          Pressione para zoom
        </Button>
      </View>
    </YStack>
  )
}
