import { useEffect } from 'react'
import Animated, { FadeInDown, RollInRight } from 'react-native-reanimated'
import LottieView from 'lottie-react-native'
import { Bag, CurrencyCircleDollar } from 'phosphor-react-native'
import { getTokens, Text, View, XStack, YStack } from 'tamagui'

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedText = Animated.createAnimatedComponent(Text)

import { useRouter } from 'expo-router'

import Truck from '@/assets/animations/truck.json'
import { ROUTES } from '@/utils/constants/routes'

export default function Splash() {
  const iconColor = getTokens().color.blue200.val
  const iconSize = 32
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(ROUTES.home)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" gap={12}>
      <XStack alignItems="flex-end" position="relative">
        <View position="absolute" top={125} left={25}>
          <AnimatedView entering={RollInRight.duration(2000).delay(1000)}>
            <Bag
              color={iconColor}
              size={iconSize}
              weight="bold"
              style={{ transform: [{ rotate: '-50deg' }] }}
            />
          </AnimatedView>
        </View>
        <LottieView
          style={{
            width: 250,
            height: 250,
          }}
          loop
          autoPlay
          source={Truck}
        />
        <View position="absolute" top={125} right={10}>
          <AnimatedView entering={RollInRight.duration(2000)}>
            <CurrencyCircleDollar
              color={iconColor}
              size={iconSize}
              weight="bold"
              style={{ transform: [{ rotate: '50deg' }] }}
            />
          </AnimatedView>
        </View>
      </XStack>
      <YStack y={-75} x={10}>
        <AnimatedText
          entering={FadeInDown.duration(2000)}
          color={iconColor}
          fontSize={24}
          fontWeight="600"
        >
          Sertton
        </AnimatedText>
      </YStack>
    </YStack>
  )
}
