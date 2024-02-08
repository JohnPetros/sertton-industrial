import { YStack } from 'tamagui'
import { H1 } from 'tamagui'

import { OrdersList } from '@/components/screens/Orders/OrdersList'
import { Header } from '@/components/shared/Header'
import { SCREEN } from '@/utils/constants/screen'

export function Orders() {
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
