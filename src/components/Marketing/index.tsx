import { YStack } from 'tamagui'

import { collectionsMock } from '@/_tests_/mocks/collectionsMock'
import { Banner } from '@/components/Marketing/Banner'
import { Collection } from '@/components/Marketing/Collection'
import { useBanners } from '@/components/Marketing/useBanners'
import { useCollections } from '@/components/Marketing/useCollections'
import { useMarketing } from '@/components/Marketing/useMarketing'

export function Marketing() {
  const { banners } = useBanners()
  const { collections, isLoading } = useCollections()
  const { items, isBanner, isCollection } = useMarketing(
    banners ?? [],
    collections ?? []
  )

  return isLoading ? (
    <Collection
      key={collectionsMock[0].id}
      data={collectionsMock[0]}
      isLoading={true}
    />
  ) : (
    items?.map((item) => {
      if (item.type === 'banner' && isBanner(item.data)) {
        return <Banner key={item.data.id} data={item.data} />
      }
      if (item.type === 'collection' && isCollection(item.data)) {
        return (
          <YStack key={item.data.id} px={24} py={24}>
            <Collection data={item.data} isLoading={false} />
          </YStack>
        )
      }
    })
  )
}
