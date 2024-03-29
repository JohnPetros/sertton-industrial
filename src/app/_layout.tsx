import { Suspense } from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import { PortalProvider } from '@gorhom/portal'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { Text, Theme } from 'tamagui'

import { StyledSafeAreaView } from '../components/shared/StyledSafeAreaView'
import { initializeProviders } from '../providers'

import { AppError } from '@/components/shared/AppError'
import { useAppError } from '@/components/shared/AppError/useAppError'
import { CacheProvider } from '@/providers/components/CacheProvider'
import { TamaguiProvider } from '@/providers/components/TamaguiProvider'
import { ToastProvider } from '@/providers/components/ToastProvider'

initializeProviders()

// SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const colorScheme = useColorScheme()
  const { handleAppError } = useAppError()

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  })

  if (!loaded) return null

  return (
    <CacheProvider>
      <TamaguiProvider>
        <ToastProvider>
          {/* <CustomerProvider> */}
          <ErrorBoundary onError={handleAppError} FallbackComponent={AppError}>
            <PortalProvider>
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
            </PortalProvider>
          </ErrorBoundary>
          {/* </CustomerProvider> */}
        </ToastProvider>
      </TamaguiProvider>
    </CacheProvider>
  )
}
