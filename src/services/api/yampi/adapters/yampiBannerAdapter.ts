import type { YampiBanner } from '../types/YampiBanner'

import type { Banner } from '@/@types/banner'

export function yampiBannerAdapter(yampiBanner: YampiBanner) {
  const banner: Banner = {
    id: yampiBanner.id,
    imageUrl: yampiBanner.mobile_image_url,
  }

  return banner
}
