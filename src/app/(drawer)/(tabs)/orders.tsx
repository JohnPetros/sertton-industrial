import { H1, YStack } from 'tamagui'

import { OrdersList } from '@/components/OrdersList'
import { SCREEN } from '@/utils/constants/screen'

export default function OrdersScreen() {
  return (
    <YStack flex={1} px={SCREEN.paddingX}>
      <H1 color="$gray800" fontSize={24}>
        Meus produtos
      </H1>
      <OrdersList />
    </YStack>
  )
}
