import { ScrollView, YStack } from 'tamagui'

import { Collection } from '@/components/Collection'
import { Footer } from '@/components/Footer'
import { Search } from '@/components/Form/Search'
import { Header } from '@/components/Header'
import { InformativeHighlights } from '@/components/InformativeHighlights'
import { LeadCapture } from '@/components/LeadCapture'
import { useCollections } from '@/hooks/useCollections'
import { collectionsMock } from '@/tests/mocks/collectionsMock'
import { SCREEN } from '@/utils/constants/screen'

export default function Home() {
  const { collections, isLoading } = useCollections()

  return (
    <YStack>
      <YStack px={SCREEN.paddingX}>
        <Header />
        <Search />
      </YStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SCREEN.paddingBottom }}
      >
        <YStack mt={24} gap={24} px={SCREEN.paddingX}>
          <InformativeHighlights />
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
        <YStack mt={40}>
          <LeadCapture />
        </YStack>
        <Footer />
      </ScrollView>
    </YStack>
  )
}
