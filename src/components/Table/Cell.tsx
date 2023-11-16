import { ReactNode } from 'react'
import { View } from 'tamagui'

interface CellProps {
  children: ReactNode
}

export function Cell({ children }: CellProps) {
  return (
    <View
      borderRadius={4}
      borderWidth={1}
      borderColor="$gray400"
      p={12}
      alignItems="center"
    >
      {children}
    </View>
  )
}
