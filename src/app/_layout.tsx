import { Suspense, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import Toast from 'react-native-toast-message'
import { QueryClient, QueryClientProvider } from 'react-query'
import { PortalProvider } from '@gorhom/portal'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { TamaguiProvider } from 'providers/TamaguiProvider'
import { Text, Theme } from 'tamagui'

import { StyledSafeAreaView } from '../components/StyledSafeAreaView'

import { AppError } from '@/components/AppError'
import { useAppError } from '@/components/AppError/useAppError'
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
  const { handleAppError } = useAppError()

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
    <>
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider>
          <ErrorBoundary onError={handleAppError} FallbackComponent={AppError}>
            <PortalProvider>
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
            </PortalProvider>
          </ErrorBoundary>
        </TamaguiProvider>
      </QueryClientProvider>
      <Toast />
    </>
  )
}
