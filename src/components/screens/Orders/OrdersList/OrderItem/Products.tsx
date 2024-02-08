import { Separator, XStack, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { Heading } from './Heading'

import { ComputedOrder } from '@/@types/computedOrder'
import * as Product from '@/components/shared/Product'
import { Summary } from '@/components/shared/Summary'
import { SCREEN } from '@/utils/constants/screen'

type ProductsProps = {
  subtotal: number
  discount: number
  shipment: number
  total: number
  itemsAmount: number
  products: Pick<ComputedOrder, 'items'>
}

export function Products({
  discount,
  itemsAmount,
  shipment,
  subtotal,
  total,
  products,
}: ProductsProps) {
  return (
    <YStack>
      <Heading>Produtos</Heading>
      <YStack gap={24} mt={8} separator={<Separator bg="$gray500" />}>
        {products.items.data.map((item) => (
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
      <Separator mt={12} mb={8} bg="$gray500" />
      <Summary
        subtotal={subtotal}
        discount={discount}
        shipment={shipment}
        total={total}
        itemsAmount={itemsAmount}
      />
    </YStack>
  )
}
