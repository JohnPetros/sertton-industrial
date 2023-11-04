import { YStack } from 'tamagui'

import { Collection } from '@/components/Collection'
import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import { Search } from '@/components/Search'
import { useCollections } from '@/hooks/useCollections'

export default function Home() {
  const { collections, isLoading } = useCollections()

  return (
    <YStack px={24}>
      <Header />
      <Search />
      <YStack mt={24}>
        {isLoading ? (
          <Loading message="Carregando coleção" />
        ) : (
          collections?.map((collection) => (
            <Collection key={collection.id} data={collection} />
          ))
        )}
      </YStack>
    </YStack>
  )
}
