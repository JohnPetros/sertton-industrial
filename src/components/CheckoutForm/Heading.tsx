import { Text, View, XStack, YStack } from 'tamagui'

interface TitleProps {
  step: number
  title: string
  subtitle: string
}

export function Heading({ step, title, subtitle }: TitleProps) {
  return (
    <YStack gap={8} testID={`step-${step}`}>
      <XStack gap={8} alignItems="center">
        <View
          w={32}
          h={32}
          alignItems="center"
          justifyContent="center"
          borderRadius={16}
          bg="$blue600"
        >
          <Text color="$white" fontWeight="600">
            {step}
          </Text>
        </View>
        <Text color="$blue500" fontWeight="600">
          {title}
        </Text>
      </XStack>
      <Text>{subtitle}</Text>
    </YStack>
  )
}
