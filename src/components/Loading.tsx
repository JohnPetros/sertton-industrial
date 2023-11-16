import { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { Text, YStack } from 'tamagui'

import Truck from '@/assets/animations/truck.json'

interface LoadingProps {
  message: string
  size: number
}

export function Loading({ message, size }: LoadingProps) {
  const animationRef = useRef<LottieView>(null)

  useEffect(() => {
    console.log('oi')
    animationRef.current?.play()
  }, [])

  return (
    <YStack w="100%" alignItems="center" justifyContent="center">
      <LottieView
        style={{
          width: size,
          height: size,
          zIndex: 50,
        }}
        loop
        source={require('../assets/animations/truck.json')}
      />
      <Text color="$blue200" fontSize={16} fontWeight="600">
        {message}
      </Text>
    </YStack>
  )
}
