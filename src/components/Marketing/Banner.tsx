import { Image } from 'tamagui'

import { Banner as BannerData } from '@/@types/banner'
import { SCREEN } from '@/utils/constants/screen'

type BannerProps = {
  data: BannerData
}

export function Banner({ data: { imageUrl } }: BannerProps) {
  return (
    <Image
      source={{
        uri: `https:${imageUrl}`,
      }}
      w={SCREEN.width}
      h={300}
    />
  )
}
