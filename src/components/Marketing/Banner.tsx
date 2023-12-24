import { Image } from 'tamagui'

import { Banner as BannerData } from '@/@types/banner'
import { SCREEN } from '@/utils/constants/screen'

interface BannerProps {
  data: BannerData
}

export function Banner({ data: { mobile_image_url } }: BannerProps) {
  return (
    <Image
      source={{
        uri: `https:${mobile_image_url}`,
      }}
      w={SCREEN.width}
      h={300}
    />
  )
}
