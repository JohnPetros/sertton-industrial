import { YStack } from 'tamagui'

import { Heading } from '@/components/CheckoutForm/Heading'
import { Input } from '@/components/Form/Input'

export function Step2() {
  return (
    <YStack gap={24}>
      <Heading
        step={2}
        title="Entrega"
        subtitle="Cadastre ou selecione um endereço."
      />

      <Input keyboardType="numeric" label="cep" mask="zipcode" max={8} />
    </YStack>
  )
}
