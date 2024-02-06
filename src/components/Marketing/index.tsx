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

  return (
    <YStack gap={24}>
      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner data={banners[0]} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection data={collectionsMock[0]} isLoading={true} />
        ) : (
          <Collection data={collections[0]} isLoading={false} />
        )}
      </YStack>

      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner data={banners[1]} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection data={collectionsMock[0]} isLoading={true} />
        ) : (
          <Collection data={collections[1]} isLoading={false} />
        )}
      </YStack>

      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner data={banners[2]} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection data={collectionsMock[0]} isLoading={true} />
        ) : (
          <Collection data={collections[2]} isLoading={false} />
        )}
      </YStack>
    </YStack>
  )
}
