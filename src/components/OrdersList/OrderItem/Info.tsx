import { Text, View, XStack, YStack } from 'tamagui'

import { OrderStatus } from '@/@types/order'
import { Heading } from '@/components/OrdersList/OrderItem/Heading'
import { Status } from '@/components/OrdersList/OrderItem/Status'
import { useDate } from '@/services/date'

interface InfoProps {
  status: OrderStatus
  statusName: string
  creationDate: Date
}

export function Info({ status, statusName, creationDate }: InfoProps) {
  const { format } = useDate()

  const statusType =
    status === 'waiting_payment'
      ? 'waiting_payment'
      : status === 'cancelled'
      ? 'cancelled'
      : 'paid'

  return (
    <XStack justifyContent="space-between">
      <YStack gap={8}>
        <Heading>Status</Heading>
        <View>
          <Status type={statusType}>{statusName}</Status>
        </View>
      </YStack>
      <YStack gap={8}>
        <Heading>Data</Heading>
        <View>
          <Text>{format(creationDate, 'DD/MM/YYYY')}</Text>
        </View>
      </YStack>
    </XStack>
  )
}
