import { Spinner, Text, XStack, YStack } from 'tamagui'

import { useShipmentServiceForm } from './useShipmentServiceForm'

import { Button } from '@/components/shared/Button'
import { Loading } from '@/components/shared/Loading'
import { RadioGroup } from '@/components/shared/RadioGroup'
import { Radio } from '@/components/shared/RadioGroup/Radio'
import { formatPrice } from '@/utils/helpers/formatPrice'

export function ShipmentServiceForm() {
  const {
    handleShipmentServiceChange,
    handleContinueCheckout,
    selectedShipmentService,
    shipmentServices,
    isLoading,
  } = useShipmentServiceForm()

  if (shipmentServices) {
    return (
      <YStack gap={12}>
        <Text>Escolha uma forma de entrega</Text>
        <RadioGroup
          value={selectedShipmentService?.name ?? ''}
          onChange={handleShipmentServiceChange}
        >
          {shipmentServices.map((shipmentService) => (
            <Radio
              key={shipmentService.name}
              isSelected={
                shipmentService.name === selectedShipmentService?.name
              }
              isOpen={false}
              value={shipmentService.name}
              label={
                <XStack
                  flex={1}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <YStack>
                    <Text color="$gray900" fontWeight="600">
                      {shipmentService.name}
                    </Text>
                    <Text color="$gray700" fontSize={12}>
                      Entrega garantida
                    </Text>
                  </YStack>
                  <Text color="$green500" fontSize={16} fontWeight="600">
                    {formatPrice(shipmentService.price)}
                  </Text>
                </XStack>
              }
            />
          ))}
        </RadioGroup>
        {selectedShipmentService && (
          <Button
            testID="continue-checkout-button"
            disabled={isLoading}
            mt={36}
            onPress={handleContinueCheckout}
          >
            {isLoading ? <Spinner color="$white" /> : 'Continuar'}
          </Button>
        )}
      </YStack>
    )
  } else {
    return (
      <YStack mt={-48}>
        <Loading message="calculando fretes..." size={150} />
      </YStack>
    )
  }
}
