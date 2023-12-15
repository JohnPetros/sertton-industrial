import { Separator, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { AddressForm } from '@/components/CheckoutForm/AddressForm'
import { Heading } from '@/components/CheckoutForm/Heading'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

function ContinueButton() {
  const selectedShipmentService = useCheckoutStore(
    (store) => store.state.shipmentService
  )
  const setStep = useCheckoutStore((store) => store.actions.setStep)

  if (selectedShipmentService)
    return (
      <Button mt={36} onPress={() => setStep(3)}>
        Continuar
      </Button>
    )
}

export function Step2() {
  return (
    <YStack flex={1} px={SCREEN.paddingX} pb={140}>
      <Heading
        step={2}
        title="Entrega"
        subtitle="Cadastre ou selecione um endereço."
      />
      <YStack mt={24} gap={24} separator={<Separator bg="$gray500" />}>
        <AddressForm />
      </YStack>
      <ContinueButton />
    </YStack>
  )
}
