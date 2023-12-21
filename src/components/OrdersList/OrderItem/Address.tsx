import { YStack } from 'tamagui'
import { Text } from 'tamagui'

import { useMask } from '@/components/Form/Input/useMask'
import { Heading } from '@/components/OrdersList/OrderItem/Heading'
import { useDate } from '@/services/date'

interface AddressProps {
  receiver: string
  state: string
  street: string
  city: string
  zipcode: string
  number: string
  neighborhood: string
  complement?: string
  deliveryDays: number
  deliveryDate: Date
  shipmentServiceName: string
}

export function Address({
  receiver,
  state,
  street,
  number,
  zipcode,
  city,
  complement,
  deliveryDays,
  deliveryDate,
  neighborhood,
  shipmentServiceName,
}: AddressProps) {
  const { format } = useDate()
  const mask = useMask('cep')

  return (
    <YStack>
      <Heading>Endereço de entrega</Heading>
      <YStack mt={8} gap={4}>
        <Text color="$gray900" fontWeight="600">
          {receiver}
        </Text>
        <Text color="$gray900">
          {street}, {number}, {neighborhood}
        </Text>
        <Text color="$gray900">
          {city} / {state}
        </Text>
        {complement && <Text color="$gray900">{complement}</Text>}
        <Text color="$gray900" fontWeight="600">
          CEP: {mask(zipcode)}
        </Text>
      </YStack>
      <YStack mt={12} gap={4}>
        <Text color="$gray700">Prazo: {deliveryDays} dias</Text>
        <Text color="$gray700">
          Data prevista: {format(deliveryDate, 'DD/MM/YYYY')}
        </Text>
        <Text color="$gray700">Serviço de frete: {shipmentServiceName}</Text>
      </YStack>
    </YStack>
  )
}
