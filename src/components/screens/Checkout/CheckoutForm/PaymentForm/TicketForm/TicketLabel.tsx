import { Barcode } from 'phosphor-react-native'
import { getTokens, Text, XStack, YStack } from 'tamagui'

export function TicketLabel() {
  return (
    <YStack gap={12}>
      <XStack gap={8}>
        <Barcode color={getTokens().color.gray800.val} />
        <Text fontWeight="600" color="$gray900">
          Boleto
        </Text>
      </XStack>
    </YStack>
  )
}
