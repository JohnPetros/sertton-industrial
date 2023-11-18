import { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { Text, YStack } from 'tamagui'

import Truck from '@/assets/animations/truck.json'

interface LoadingProps {
  message: string
  size: number
}

export function Loading({ message, size = 80 }: LoadingProps) {
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    animationRef.current?.play()
  }, [])

  return (
    <YStack w="100%" alignItems="center" justifyContent="center">
      <LottieView
        style={{
          width: size,
          height: size,
          zIndex: 150,
        }}
        loop
        resizeMode="contain"
        source={Truck}
      />
      <Text color="$blue200" fontSize={16} fontWeight="600">
        {message}
      </Text>
    </YStack>
  )
}
