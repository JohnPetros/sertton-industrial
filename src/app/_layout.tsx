import '../providers'
import '../../globals'

import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { StatusBar } from 'react-native'
import { PortalProvider } from '@gorhom/portal'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { Text, Theme } from 'tamagui'

import { StyledSafeAreaView } from '../components/StyledSafeAreaView'

SplashScreen.preventAutoHideAsync()

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
    <StatusBar
      backgroundColor={'#f5f1f1'}
      translucent
      barStyle="dark-content"
    />
  )
}
