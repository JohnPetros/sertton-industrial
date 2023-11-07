import LottieView from 'lottie-react-native'
import { Text, YStack } from 'tamagui'

import Truck from '@/assets/animations/truck.json'

interface LoadingProps {
  message: string
}

export function Loading({ message }: LoadingProps) {
  return (
    <YStack>
      <LottieView
        style={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        source={require('@/assets/animations/truck.json')}
      />
      <Text color="$blue200" fontSize={12}>
        {message}
      </Text>
    </YStack>
  )
}
