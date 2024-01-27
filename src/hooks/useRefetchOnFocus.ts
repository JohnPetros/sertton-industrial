import { useEffect, useState } from 'react'
import { useFocusEffect } from 'expo-router'

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
      refetch()
    }
  }, [canRefetch, isScreenFocused, refetch])
}
