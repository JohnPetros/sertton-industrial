import { useEffect } from 'react'
import { useRouter } from 'expo-router'

import { ROUTES } from '@/utils/constants/routes'

export function useSplash() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(ROUTES.home)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])
}
