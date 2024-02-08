import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { ScrollView, YStack } from 'tamagui'

import { Footer } from './Footer'
import { InformativeHighlights } from './InformativeHighlights'
import { LeadCapture } from './LeadCapture'
import { Marketing } from './Marketing'

import { Header } from '@/components/shared/Header'
import { Search } from '@/components/shared/Search'
import { SCREEN } from '@/utils/constants/screen'

export function Home() {
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
