import { useMemo } from 'react'

import { Banner } from '@/@types/banner'
import { Collection } from '@/@types/collection'

export type MarketingItemType = 'banner' | 'collection'

export function useMarketing(banners: Banner[], collections: Collection[]) {
  const items = useMemo(() => {
    const items = []
    const limit = Math.min(banners.length, collections.length)
    for (let index = 0; index < limit; index++) {
      items.push({ type: 'banner', data: banners[index] })
      items.push({ type: 'collection', data: collections[index] })
    }
    return items
  }, [banners, collections])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isCollection(data: any): data is Collection {
    return 'products' in data
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isBanner(data: any): data is Banner {
    return 'mobile_image_url' in data
  }

  return {
    items,
    isCollection,
    isBanner,
  }
}
