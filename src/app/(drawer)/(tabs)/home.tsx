import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { Footer } from '@/components/Footer'
import { Search } from '@/components/Form/Search'
import { Header } from '@/components/Header'
import { InformativeHighlights } from '@/components/InformativeHighlights'
import { LeadCapture } from '@/components/LeadCapture'
import { Marketing } from '@/components/Marketing'
import { Banner } from '@/components/Marketing/Banner'
import { Collection } from '@/components/Marketing/Collection'
import { useBanners } from '@/components/Marketing/useBanners'
import { useCollections } from '@/components/Marketing/useCollections'
import { useMarketing } from '@/components/Marketing/useMarketing'
import { SCREEN } from '@/utils/constants/screen'

export default function HomeScreen() {
  const { banners, areBannersLoading } = useBanners()
  const { collections, areCollectionsLoading } = useCollections()
  const { items, isBanner, isCollection } = useMarketing(
    banners ?? [],
    collections ?? []
  )

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])

  return (
    <YStack>
      <YStack px={SCREEN.paddingX} pb={12}>
        <Header />
        <Search />
      </YStack>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SCREEN.paddingBottom }}
      >
        <YStack mt={12} mb={24} gap={24} px={SCREEN.paddingX}>
          <InformativeHighlights />
        </YStack>

        <Marketing />

        <YStack mt={40}>
          <LeadCapture />
        </YStack>

        <Footer />
      </ScrollView>
    </YStack>
  )
}
