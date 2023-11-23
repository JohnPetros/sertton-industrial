import { ReactNode, useRef, useState } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { Icon } from 'phosphor-react-native'
import { getTokens, Tabs as T, Text, View } from 'tamagui'

const AnimatedView = Animated.createAnimatedComponent(View)

import { LayoutChangeEvent } from 'react-native'

import { SCREEN } from '@/utils/constants/screen'

const TAB_INDICATOR_HEIGHT = 44
const TAB_INDICATOR_WIDTH = 150
const TAB_LIST_GAP = 8

type Tab = {
  title: string
  value: string
  icon: Icon
  content: ReactNode
}

interface TabsProps {
  label: string
  tabs: Tab[]
}

export function Tabs({ label, tabs }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].value)
  const tabIndicatorPositionX = useSharedValue(-75)
  const tabsPositionsX = useRef<number[]>([])

  const tabIndicatorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabIndicatorPositionX.value }],
    }
  })

  function handleTabPress(value: string, index: number) {
    tabIndicatorPositionX.value = withTiming(
      tabsPositionsX.current[index] -
        TAB_INDICATOR_WIDTH / 2 -
        TAB_LIST_GAP -
        SCREEN.paddingX
    )

    setActiveTab(value)
  }

  function handleTabLayout({ nativeEvent }: LayoutChangeEvent, index: number) {
    const { x } = nativeEvent.layout

    tabsPositionsX.current[index] = x
  }

  return (
    <T
      w={SCREEN.width - SCREEN.paddingX * 2}
      height={400}
      defaultValue={tabs[0].value}
      flexDirection="column"
    >
      <T.List
        borderWidth={1}
        borderColor="$gray500"
        borderRadius={4}
        justifyContent="center"
        alignItems="center"
        h={60}
        gap={TAB_LIST_GAP}
        w="100%"
        position="relative"
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          return (
            <T.Tab
              unstyled
              key={tab.value}
              aria-label={label}
              value={tab.value}
              borderRadius={4}
              w={TAB_INDICATOR_WIDTH}
              h={TAB_INDICATOR_HEIGHT}
              gap={8}
              zIndex={50}
              onPress={() => handleTabPress(tab.value, index)}
              onLayout={(event) => handleTabLayout(event, index)}
            >
              <Icon
                color={
                  getTokens().color[
                    activeTab === tab.value ? 'white' : 'gray800'
                  ].val
                }
              />
              <Text
                color={activeTab === tab.value ? '$white' : '$gray800'}
                fontWeight="600"
              >
                {tab.title}
              </Text>
            </T.Tab>
          )
        })}

        <View position="absolute">
          <AnimatedView
            style={tabIndicatorAnimatedStyle}
            bg="$blue500"
            w={TAB_INDICATOR_WIDTH}
            h={TAB_INDICATOR_HEIGHT}
            borderRadius={4}
            zIndex={100}
          />
        </View>
      </T.List>

      {tabs.map((tab) => (
        <T.Content key={tab.value} value={tab.value}>
          {tab.content}
        </T.Content>
      ))}
    </T>
  )
}
