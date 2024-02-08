import { YStack } from 'tamagui'

import { Skeleton } from '../Skeleton'

import { collectionsMock } from '@/_tests_/mocks/collectionsMock'
import { Banner } from '@/components/Marketing/Banner'
import { Collection } from '@/components/Marketing/Collection'
import { useBanners } from '@/components/Marketing/useBanners'
import { useCollections } from '@/components/Marketing/useCollections'
import { SCREEN } from '@/utils/constants/screen'

export function Marketing() {
  const { banners, areBannersLoading } = useBanners()
  const { collections, areCollectionsLoading } = useCollections()

  return (
    <YStack gap={24}>
      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner imageUrl={banners[0].imageUrl} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection
            name={collectionsMock[0].name}
            products={collectionsMock[0].products}
            isLoading={true}
          />
        ) : (
          <Collection
            name={collections[0].name}
            products={collections[0].products}
            isLoading={false}
          />
        )}
      </YStack>

      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner imageUrl={banners[1].imageUrl} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection
            name={collectionsMock[0].name}
            products={collectionsMock[0].products}
            isLoading={true}
          />
        ) : (
          <Collection
            name={collections[1].name}
            products={collections[1].products}
            isLoading={false}
          />
        )}
      </YStack>

      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner imageUrl={banners[2].imageUrl} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection
            name={collectionsMock[0].name}
            products={collectionsMock[0].products}
            isLoading={true}
          />
        ) : (
          <Collection
            name={collections[2].name}
            products={collections[2].products}
            isLoading={false}
          />
        )}
      </YStack>
    </YStack>
  )
}
