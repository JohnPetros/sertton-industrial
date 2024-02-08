import { H3, XStack, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { Address } from './Address'
import { Info } from './Info'
import { Payment } from './Payment'
import { Products } from './Products'
import { useOrderItem } from './useOrderItem'

import type { ComputedOrder } from '@/@types/computedOrder'
import type { OrderStatus } from '@/@types/order'
import { Accordion } from '@/components/shared/Accordion'
import { Skeleton } from '@/components/shared/Skeleton'
import { SCREEN } from '@/utils/constants/screen'

interface OrderItemProps {
  data: ComputedOrder
  isLoading: boolean
}

export function OrderItem({ data, isLoading }: OrderItemProps) {
  const {
    items,
    number,
    status,
    value_shipment,
    created_at,
    shipping_address,
    days_delivery,
    date_delivery,
    shipment_service,
    transactions,
  } = data
  const { totalDiscount, skusAmount, subtotal } = useOrderItem(data)

  return (
    <XStack>
      <Skeleton
        isVisible={isLoading}
        width={SCREEN.width - SCREEN.paddingX * 2}
        height={80}
        flex={1}
      >
        <Accordion
          label={
            <YStack>
              <H3 color="$gray800" fontSize={16}>
                Número do pedido
              </H3>
              <Text color="$gray400" fontSize={14}>
                #{number}
              </Text>
            </YStack>
          }
        >
          <YStack mt={24} gap={24}>
            <Info
              status={status.data.alias as OrderStatus}
              statusName={status.data.name}
              creationDate={new Date(created_at.date)}
            />

            <Products
              subtotal={subtotal}
              discount={totalDiscount}
              shipment={value_shipment}
              total={subtotal - totalDiscount + value_shipment}
              itemsAmount={skusAmount}
              products={{ items }}
            />

            <Address
              number={shipping_address.data.number}
              deliveryDate={new Date(date_delivery.date)}
              deliveryDays={days_delivery}
              neighborhood={shipping_address.data.neighborhood}
              shipmentServiceName={shipment_service}
              receiver={shipping_address.data.receiver}
              city={shipping_address.data.city}
              state={shipping_address.data.uf}
              street={shipping_address.data.street}
              zipcode={shipping_address.data.zip_code}
              complement={shipping_address.data.complement}
            />

            <Payment
              name={transactions.data[0].payment.data.name}
              icon={transactions.data[0].payment.data.icon_url}
              pdf={
                transactions.data[0].payment.data.is_billet
                  ? transactions.data[0].billet_url
                  : null
              }
              method={
                transactions.data[0].payment.data.is_billet
                  ? 'ticket'
                  : transactions.data[0].payment.data.is_pix
                  ? 'pix'
                  : 'credit-card'
              }
            />
          </YStack>
        </Accordion>
      </Skeleton>
    </XStack>
  )
}
