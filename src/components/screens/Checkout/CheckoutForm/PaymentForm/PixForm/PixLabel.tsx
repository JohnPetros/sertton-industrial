import { CurrencyCircleDollar } from 'phosphor-react-native'
import { getTokens, Text, XStack, YStack } from 'tamagui'

export function PixLabel() {
  return (
    <YStack gap={12}>
      <XStack gap={8}>
        <CurrencyCircleDollar color={getTokens().color.gray800.val} />
        <Text fontWeight="600" color="$gray900">
          Pix
        </Text>
      </XStack>
    </YStack>
  )
}
