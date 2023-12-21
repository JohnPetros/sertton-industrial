import { H1, YStack } from 'tamagui'

import { Header } from '@/components/Header'
import { OrdersList } from '@/components/OrdersList'
import { SCREEN } from '@/utils/constants/screen'

export default function OrdersScreen() {
  return (
    <YStack flex={1} px={SCREEN.paddingX}>
      <Header />
      <H1 color="$gray800" fontSize={24}>
        Meus pedidos
      </H1>
      <OrdersList />
    </YStack>
  )
}
