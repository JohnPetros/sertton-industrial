import type { YampiImage } from '../types/YampiImage'

import { Image } from '@/@types/productImage'

export function yampiImageAdapter(yampiImage: YampiImage) {
  const images: Image[] = [
    {
      size: 'large',
      height: yampiImage.large.height,
      width: yampiImage.large.width,
      url: yampiImage.large.url,
    },
    {
      size: 'medium',
      height: yampiImage.medium.height,
      width: yampiImage.medium.width,
      url: yampiImage.medium.url,
    },
    {
      size: 'small',
      height: yampiImage.small.height,
      width: yampiImage.small.width,
      url: yampiImage.small.url,
    },
    {
      size: 'thumb',
      height: yampiImage.small.height,
      width: yampiImage.small.width,
      url: yampiImage.small.url,
    },
  ]

  return images
}
