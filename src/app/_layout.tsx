import '../providers'

import { Suspense, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import { PortalProvider } from '@gorhom/portal'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Text, Theme } from 'tamagui'

import { StyledSafeAreaView } from '../components/StyledSafeAreaView'

import { AppError } from '@/components/AppError'
import { useAppError } from '@/components/AppError/useAppError'
import { CustomerProvider } from '@/contexts/CustomerContext'
import { QueryClientProvider } from '@/providers/components/QueryClientProvider'
import { TamaguiProvider } from '@/providers/components/TamaguiProvider'
import { ToastProvider } from '@/providers/components/ToastProvider'

SplashScreen.preventAutoHideAsync()

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
    <QueryClientProvider>
      <TamaguiProvider>
        <ToastProvider>
          <CustomerProvider>
            <ErrorBoundary
              onError={handleAppError}
              FallbackComponent={AppError}
            >
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
          </CustomerProvider>
        </ToastProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  )
}
