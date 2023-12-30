import { useEffect, useState } from 'react'
import { useFocusEffect } from 'expo-router/src/useFocusEffect'

interface Params {
  refetch: VoidFunction
  canRefetch?: boolean
}

export function useRefetchOnFocus({ refetch, canRefetch = true }: Params) {
  const [isScreenFocused, setIsScreenFocused] = useState(false)
  useFocusEffect(() => {
    setIsScreenFocused(true)
    return () => setIsScreenFocused(false)
  })

  useEffect(() => {
    if (isScreenFocused && canRefetch) {
      console.log('OIIIIIIIIIIIIIIIIIIIIIIIIIIIIII')
      refetch()
    }
  }, [canRefetch, isScreenFocused, refetch])
}
