import { CreditCard } from 'phosphor-react-native'
import { getTokens, Image, Text, XStack, YStack } from 'tamagui'

export function CreditCardLabel() {
  return (
    <YStack gap={12}>
      <XStack gap={8}>
        <CreditCard color={getTokens().color.gray800.val} />
        <Text fontWeight="600" color="$gray900">
          Cartão de Crédito
        </Text>
      </XStack>
      {/* <XStack gap={8}>
        <Image source={require('@/assets/icons/visa.svg')} />
        <Image source={require('@/assets/icons/visa.svg')} />
        <Image source={require('@/assets/icons/visa.svg')} />
      </XStack> */}
    </YStack>
  )
}
