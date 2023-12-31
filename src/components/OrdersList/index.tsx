import { FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { Bag } from 'phosphor-react-native'
import { View } from 'tamagui'
import { YStack } from 'tamagui'

import { ordersMock } from '@/_tests_/mocks/ordersMock'
import { Button } from '@/components/Button'
import { EmailDialog } from '@/components/Dialog/EmailDialog'
import { SignUpDialog } from '@/components/Dialog/SignUpDialog'
import { EmptyItemsMessage } from '@/components/EmptyItemsMessage'
import { OrderItem } from '@/components/OrdersList/OrderItem'
import { useOrdersList } from '@/components/OrdersList/useOrdersList'
import { useCustomerContext } from '@/contexts/CustomerContext'

export function OrdersList() {
  const { customer } = useCustomerContext()

  const { orders, isLoading, emailDialogRef } = useOrdersList(customer)
  const router = useRouter()

  return (
    <>
      <EmailDialog
        label="Digite seu e-mail para buscarmos seus dados de cadastro. Ou crie um ao pressionar criar cadastro."
        ref={emailDialogRef}
        fallback={
          <YStack gap={4} mt={12}>
            <SignUpDialog>
              <Button background="outline">Criar cadastro</Button>
            </SignUpDialog>
            <Button background="transparent">Voltar</Button>
          </YStack>
        }
      />
      {isLoading ? (
        <FlatList
          data={ordersMock}
          renderItem={({ item }) => (
            <View mb={24}>
              <OrderItem data={item} isLoading={true} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          disableIntervalMomentum={true}
          scrollEnabled={!isLoading}
        />
      ) : !orders ? (
        <EmptyItemsMessage
          title="Nenhum pedido realizado"
          subtitle=""
          callback={
            <Button mt={12} onPress={router.back}>
              Voltar
            </Button>
          }
          icon={Bag}
        />
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <View mb={24}>
              <OrderItem data={item} isLoading={false} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          disableIntervalMomentum={true}
          scrollEnabled={!isLoading}
        />
      )}
    </>
  )
}
