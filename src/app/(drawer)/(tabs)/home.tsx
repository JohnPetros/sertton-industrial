import { YStack } from 'tamagui'

import { Collection } from '@/components/Collection'
import { Search } from '@/components/Form/Search'
import { Header } from '@/components/Header'
import { useCollections } from '@/hooks/useCollections'
import { collectionsMock } from '@/tests/mocks/collectionsMock'

export default function Home() {
  const { collections, isLoading } = useCollections()

  return (
    <YStack px={24}>
      <Header />
      <Search />
      <YStack mt={24}>
        {isLoading ? (
          <Collection
            key={collectionsMock[0].id}
            data={collectionsMock[0]}
            isLoading={true}
          />
        ) : (
          collections?.map((collection) => (
            <Collection
              key={collection.id}
              data={collection}
              isLoading={false}
            />
          ))
        )}
      </YStack>
    </YStack>
  )
}
