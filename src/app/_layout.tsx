import { Suspense, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PortalProvider } from '@gorhom/portal'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { TamaguiProvider, Text, Theme } from 'tamagui'

import config from '../../tamagui.config'
import { StyledSafeAreaView } from '../components/StyledSafeAreaView'

import { CustomerProvider } from '@/contexts/CustomerContext'
import { axiosApi } from '@/libs/axios'
import { dayjsProvider } from '@/libs/dayjs'
import { mmkvStorage } from '@/libs/mmkv'
import { initializeApi } from '@/services/api'
import { initializeDateProvider } from '@/services/date'
import { initializeStorage } from '@/services/storage'

SplashScreen.preventAutoHideAsync()

initializeStorage(mmkvStorage)
initializeDateProvider(dayjsProvider)
initializeApi(axiosApi)

const queryClient = new QueryClient()

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

  return (
    <PortalProvider>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={config}>
          <Suspense fallback={<Text>Loading...</Text>}>
            <Theme name={colorScheme}>
              <CustomerProvider>
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
              </CustomerProvider>
            </Theme>
          </Suspense>
        </TamaguiProvider>
      </QueryClientProvider>
    </PortalProvider>
  )
}
