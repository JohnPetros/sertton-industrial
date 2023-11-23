import { Suspense, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { TamaguiProvider, Text, Theme } from 'tamagui'

import config from '../../tamagui.config'
import { StyledSafeAreaView } from '../components/StyledSafeAreaView'

import { initializeStorage } from '@/services/storage'
import { mmkv } from '@/services/storage/mmkv'

SplashScreen.preventAutoHideAsync()

initializeStorage(mmkv)

export default function Layout() {
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) return null

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={config}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Theme name={colorScheme}>
            <StyledSafeAreaView>
              <StatusBar
                backgroundColor={'#f5f1f1'}
                translucent
                barStyle="dark-content"
              />
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </StyledSafeAreaView>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}
