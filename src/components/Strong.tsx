import { ReactNode } from 'react'
import { Text, YStack } from 'tamagui'

interface StrongProps {
  children: ReactNode
}

export function Strong({ children }: StrongProps) {
  return (
    <YStack bg="$red50" borderRadius={4} py={8} px={12} w="100%">
      <Text textAlign="center" color="$red800" fontWeight="600" fontSize={16}>
        {children}
      </Text>
    </YStack>
  )
}
