import { SvgUri } from 'react-native-svg'
import { H3, H4, Separator, View, XStack, YStack } from 'tamagui'
import { Text } from 'tamagui'

import type { ComputedOrder } from '@/@types/computedOrder'
import { Accordion } from '@/components/Accordion'
import { useMask } from '@/components/Form/Input/useMask'
import { Heading } from '@/components/OrdersList/OrderItem/Heading'
import { Link } from '@/components/OrdersList/OrderItem/Link'
import { Status } from '@/components/OrdersList/OrderItem/Status'
import { useOrderItem } from '@/components/OrdersList/OrderItem/useOrderItem'
import * as Product from '@/components/Product'
import { Summary } from '@/components/Summary'
import { useDate } from '@/services/date'
import { SCREEN } from '@/utils/constants/screen'

interface OrderItemProps {
  data: ComputedOrder
}

export function OrderItem({ data }: OrderItemProps) {
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
  const { format } = useDate()
  const mask = useMask('cep')

  console.log(created_at)

  return (
    <XStack>
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
        <XStack mt={12} justifyContent="space-between">
          <YStack gap={8}>
            <Heading>Status</Heading>
            <View>
              <Status type={status.data.alias}>{status.data.name}</Status>
            </View>
          </YStack>
          <YStack gap={8}>
            <Heading>Data</Heading>
            <View>
              <Text>{format(new Date(created_at.date), 'DD/MM/YYYY')}</Text>
            </View>
          </YStack>
        </XStack>

        <Heading mt={12}>Produtos</Heading>
        <YStack gap={24} mt={8} separator={<Separator bg="$gray500" />}>
          {items.data.map((item) => (
            <XStack key={item.id} justifyContent="space-between">
              <YStack gap={8} w={SCREEN.width - SCREEN.paddingX * 2 - 100}>
                <Product.SkuCode>{item.sku.data.sku}</Product.SkuCode>
                <Product.Name>{item.sku.data.title}</Product.Name>
                <XStack gap={8}>
                  <Product.SalePrice price={item.sku.data.price_discount} />
                  <Product.DiscountPrice price={item.sku.data.price_sale} />
                </XStack>
              </YStack>
              <Text color="$gray600">qtd.: {item.quantity}</Text>
            </XStack>
          ))}
        </YStack>
        <Separator mt={24} mb={8} bg="$gray500" />
        <Summary
          subtotal={subtotal}
          discount={totalDiscount}
          shipment={value_shipment}
          total={subtotal - totalDiscount + value_shipment}
          itemsAmount={skusAmount}
        />

        <YStack mt={12} gap={4}>
          <Heading mt={12}>Endereço de entrega</Heading>
          <Text color="$gray900" fontWeight="600">
            {shipping_address.data.receiver}
          </Text>
          <Text color="$gray900">
            {shipping_address.data.street}, {shipping_address.data.number},{' '}
            {shipping_address.data.neighborhood}
          </Text>
          <Text color="$gray900">
            {shipping_address.data.city} / {shipping_address.data.uf}
          </Text>
          {shipping_address.data.complement && (
            <Text color="$gray900">{shipping_address.data.complement}</Text>
          )}
          <Text color="$gray900" fontWeight="600">
            CEP: {mask(shipping_address.data.zip_code)}
          </Text>
        </YStack>
        <YStack mt={12} gap={4}>
          <Text color="$gray700">Prazo: {days_delivery} dias</Text>
          <Text color="$gray700">
            Data prevista: {format(new Date(date_delivery.date), 'DD/MM/YYYY')}
          </Text>
          <Text color="$gray700">Serviço de frete: {shipment_service}</Text>
        </YStack>

        <Heading mt={24}>Pagamento</Heading>
        <YStack mt={8} gap={4}>
          <SvgUri uri={transactions.data[0].payment.data.icon_url} />
          <Text fontWeight="600" fontSize={16}>
            {transactions.data[0].payment.data.name}
          </Text>
          <Link url={transactions.data[0].billet_url}>Ver boleto</Link>
        </YStack>
      </Accordion>
    </XStack>
  )
}
