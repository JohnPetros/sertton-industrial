import { Text, YStack } from 'tamagui'

interface StrongProps {
  children: string
}

export function Strong({ children }: StrongProps) {
  return (
    <YStack bg="$blue100" borderRadius={4} py={8} w="100%">
      <Text textAlign="center" color="$blue700" fontWeight="600" fontSize={16}>
        {children}
      </Text>
    </YStack>
  )
}
