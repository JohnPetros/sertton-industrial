import '../providers'

import { Suspense } from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { Text, Theme } from 'tamagui'

import { StyledSafeAreaView } from '../components/shared/StyledSafeAreaView'

import { AppError } from '@/components/shared/AppError'
import { useAppError } from '@/components/shared/AppError/useAppError'
import { ReactQueryProvider } from '@/providers/components/ReactQueryProvider'
import { TamaguiProvider } from '@/providers/components/TamaguiProvider'
import { ToastProvider } from '@/providers/components/ToastProvider'

// SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const colorScheme = useColorScheme()
  const { handleAppError } = useAppError()

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  })

  if (!loaded) return null

  return (
    <ReactQueryProvider>
      <TamaguiProvider>
        <ToastProvider>
          {/* <CustomerProvider> */}
          <ErrorBoundary onError={handleAppError} FallbackComponent={AppError}>
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
          </ErrorBoundary>
          {/* </CustomerProvider> */}
        </ToastProvider>
      </TamaguiProvider>
    </ReactQueryProvider>
  )
}
