import { Image, Text, XStack, YStack } from 'tamagui'

export function CreditCardLabel() {
  return (
    <YStack gap={12}>
      <Text fontWeight="600" color="$gray900">
        Cartão de Crédito
      </Text>
      {/* <XStack gap={8}>
        <Image source={require('@/assets/icons/visa.svg')} />
        <Image source={require('@/assets/icons/visa.svg')} />
        <Image source={require('@/assets/icons/visa.svg')} />
      </XStack> */}
    </YStack>
  )
}
