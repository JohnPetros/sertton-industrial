import { YStack } from 'tamagui'

import { Skeleton } from '../Skeleton'

import { collectionsMock } from '@/_tests_/mocks/collectionsMock'
import { Banner } from '@/components/Marketing/Banner'
import { Collection } from '@/components/Marketing/Collection'
import { useBanners } from '@/components/Marketing/useBanners'
import { useCollections } from '@/components/Marketing/useCollections'
import { useMarketing } from '@/components/Marketing/useMarketing'
import { SCREEN } from '@/utils/constants/screen'

export function Marketing() {
  const { banners, areBannersLoading } = useBanners()
  const { collections, areCollectionsLoading } = useCollections()
  const { items, isBanner, isCollection } = useMarketing(
    banners ?? [],
    collections ?? []
  )

  if (areCollectionsLoading || areBannersLoading) {
    return (
      <>
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
        <Collection data={collectionsMock[0]} isLoading={true} />
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
        <Collection data={collectionsMock[1]} isLoading={true} />
      </>
    )
  } else {
    return items?.map((item) => {
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
  }
}
