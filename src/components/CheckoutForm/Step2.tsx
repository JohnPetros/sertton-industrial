import { View, YStack } from 'tamagui'

import { AddressForm } from '@/components/CheckoutForm/AddressForm'
import { Heading } from '@/components/CheckoutForm/Heading'

export function Step2() {
  return (
    <YStack>
      <Heading
        step={2}
        title="Entrega"
        subtitle="Cadastre ou selecione um endereço."
      />
      <View mt={24}>
        <AddressForm />
      </View>
    </YStack>
  )
}
