import { Separator, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { AddressForm } from '@/components/CheckoutForm/AddressForm'
import { Heading } from '@/components/CheckoutForm/Heading'
import { ShipmentServiceForm } from '@/components/CheckoutForm/ShipmentServiceForm'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

export function Step2() {
  const { customer } = useCustomerContext()
  const selectedShipmentService = useCheckoutStore(
    (store) => store.state.shipmentService
  )
  const setStep = useCheckoutStore((store) => store.actions.setStep)

  return (
    <YStack flex={1} px={SCREEN.paddingX} pb={140}>
      <Heading
        step={2}
        title="Entrega"
        subtitle="Cadastre ou selecione um endereço."
      />
      <YStack mt={24} gap={24} separator={<Separator bg="$gray500" />}>
        <AddressForm />
        {/* {customer?.selectedAddressZipcode && <ShipmentServiceForm />} */}
      </YStack>
      {selectedShipmentService && (
        <Button mt={36} onPress={() => setStep(3)}>
          Continuar
        </Button>
      )}
    </YStack>
  )
}
