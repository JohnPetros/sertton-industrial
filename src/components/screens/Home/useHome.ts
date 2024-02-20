import { useEffect } from 'react'
import { BackHandler } from 'react-native'
import { createURL, useURL } from 'expo-linking'

export function useHome() {
  const customUrl = createURL('home')

  const redirectedUrl = useURL()

  console.log({ customUrl })

  useEffect(() => {
    console.log({ redirectedUrl })
  }, [redirectedUrl])

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])

  return {}
}
