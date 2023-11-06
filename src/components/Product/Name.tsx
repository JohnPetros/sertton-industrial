import { ReactNode } from 'react'
import { Text, TextProps } from 'tamagui'

interface NameProps extends TextProps {
  children: ReactNode
}

export function Name({ children }: NameProps) {
  return (
    <Text
      flexWrap="wrap"
      numberOfLines={3}
      ellipsizeMode="tail"
      color="$gray700"
      fontWeight="600"
      fontSize={14}
    >
      {children}
    </Text>
  )
}
