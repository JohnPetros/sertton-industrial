import React from 'react'
import { SvgUri } from 'react-native-svg'
import { Text, XStack, YStack } from 'tamagui'

import type { PaymentMethod } from '@/@types/paymentMethod'
import { Clipboard } from '@/components/OrdersList/OrderItem/Clipboard'
import { Heading } from '@/components/OrdersList/OrderItem/Heading'
import { Link } from '@/components/OrdersList/OrderItem/Link'
import { useDate } from '@/services/date'

interface PaymentProps {
  icon: string
  pdf: string | null
  name: string
  method: PaymentMethod
  expirationDate?: Date
}

export function Payment({
  icon,
  pdf,
  name,
  method,
  expirationDate,
}: PaymentProps) {
  const { format } = useDate()

  return (
    <YStack>
      <Heading>Pagamento</Heading>
      <XStack mt={8} gap={12} flexWrap="wrap">
        <SvgUri uri={icon} />
        <Text fontWeight="600" fontSize={16}>
          {name}
        </Text>
        {method === 'ticket' && pdf && <Link url={pdf}>Ver boleto</Link>}
        {method === 'pix' && <Clipboard>pix</Clipboard>}
        {expirationDate && (
          <Text>{format(expirationDate, 'DD/MM/YYYY HH:mm')}</Text>
        )}
      </XStack>
    </YStack>
  )
}
