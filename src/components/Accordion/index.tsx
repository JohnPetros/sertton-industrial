import { ReactNode } from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { CaretDown } from 'phosphor-react-native'
import { getTokens, Text, XStack, YStack } from 'tamagui'

import { useAccordion } from '@/components/Accordion/useAccordion'

const AnimatedYStack = Animated.createAnimatedComponent(YStack)

const PADDING_X = 24

interface AccordionProps {
  label: ReactNode
  children: ReactNode
}

export function Accordion({ children, label }: AccordionProps) {
  const {
    contentAnimatedStyle,
    contentAnimatedRef,
    containerAnimatedStyle,
    toggle,
  } = useAccordion()

  return (
    <AnimatedYStack
      style={containerAnimatedStyle}
      borderRadius={4}
      px={PADDING_X}
      py={12}
      w="100%"
    >
      <XStack
        role="button"
        justifyContent="space-between"
        alignItems="center"
        onStartShouldSetResponder={() => {
          toggle()
          return true
        }}
      >
        <Text color="$gray800">{label}</Text>

        <CaretDown color={getTokens().color.gray400.val} size={PADDING_X} />
      </XStack>
      <Animated.View style={contentAnimatedStyle}>
        <YStack position="absolute" top={0} left={0}>
          <View ref={contentAnimatedRef} collapsable={false}>
            {children}
          </View>
        </YStack>
      </Animated.View>
    </AnimatedYStack>
  )
}
