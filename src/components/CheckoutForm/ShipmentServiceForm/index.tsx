import { FlatList } from 'react-native-gesture-handler'
import { Spinner, Text, XStack, YStack } from 'tamagui'
import { View } from 'tamagui'

import { Button } from '@/components/Button'
import { useShipmentServiceForm } from '@/components/CheckoutForm/ShipmentServiceForm/useShipmentServiceForm'
import { RadioGroup } from '@/components/Form/RadioGroup'
import { Radio } from '@/components/Form/RadioGroup/Radio'
import { Loading } from '@/components/Loading'
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
          <FlatList
            data={shipmentServices}
            extraData={selectedShipmentService}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => <View h={12} />}
            renderItem={({ item }) => {
              return (
                <Radio
                  key={item.name}
                  isSelected={item.name === selectedShipmentService?.name}
                  isOpen={false}
                  value={item.name}
                  label={
                    <XStack
                      flex={1}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <YStack>
                        <Text color="$gray900" fontWeight="600">
                          {item.name}
                        </Text>
                        <Text color="$gray700" fontSize={12}>
                          Entrega garantida
                        </Text>
                      </YStack>
                      <Text color="$green500" fontSize={16} fontWeight="600">
                        {formatPrice(item.price)}
                      </Text>
                    </XStack>
                  }
                />
              )
            }}
          />
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
