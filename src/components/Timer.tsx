import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { ReText } from 'react-native-redash'
import { getTokens, Text, XStack } from 'tamagui'

interface TimerProps {
  initialHours: number
  initialMinutes: number
  initialSeconds: number
  fontSize?: number
  color?: 'primary' | 'secondary'
}

export function Timer({
  initialHours,
  initialMinutes,
  initialSeconds,
  fontSize = 24,
  color = 'primary',
}: TimerProps) {
  const [timerSeconds, setTimerSeconds] = useState(0)

  const hours = useSharedValue(initialHours)
  const minutes = useSharedValue(initialMinutes)
  const seconds = useSharedValue(initialSeconds)

  const colorToken = color === 'primary' ? 'blue500' : 'white'

  const reTextStyle = StyleSheet.create({
    style: {
      fontSize,
      fontWeight: '600',
      color: getTokens().color[colorToken].val,
    },
  })

  const animatedHoursText = useDerivedValue(() => {
    return `${hours.value}`.padStart(2, '0')
  })

  const animatedMinutesText = useDerivedValue(() => {
    return `${minutes.value}`.padStart(2, '0')
  })

  const animatedSecondsText = useDerivedValue(() => {
    return `${seconds.value}`.padStart(2, '0')
  })

  useEffect(() => {
    if (timerSeconds === -1) return

    const timer = setTimeout(() => {
      hours.value = Math.floor(timerSeconds / 60 / 60)
      minutes.value = Math.floor((timerSeconds / 60) % 60)
      seconds.value = timerSeconds % 60

      setTimerSeconds(timerSeconds - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timerSeconds])

  useEffect(() => {
    const timeSeconds =
      initialHours * 60 * 60 + initialMinutes * 60 + initialSeconds

    setTimerSeconds(timeSeconds)
  }, [])

  return (
    <XStack alignItems="center" justifyContent="center" gap={4}>
      <ReText style={reTextStyle.style} text={animatedHoursText} />
      <Text color={`$${colorToken}`} fontWeight="600" fontSize={fontSize}>
        :
      </Text>
      <ReText style={reTextStyle.style} text={animatedMinutesText} />
      <Text color={`$${colorToken}`} fontWeight="600" fontSize={fontSize}>
        :
      </Text>
      <ReText style={reTextStyle.style} text={animatedSecondsText} />
    </XStack>
  )
}
