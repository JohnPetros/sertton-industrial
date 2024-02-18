import { FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { Bag } from 'phosphor-react-native'
import { Text, View, XStack } from 'tamagui'

import { DocumentDialog } from '../DocumentDialog'

import { OrderItem } from './OrderItem'
import { useOrdersList } from './useOrdersList'

import { computedOrdersMock } from '@/_tests_/mocks/ordersMock'
import { Button } from '@/components/shared/Button'
import { EmptyItemsMessage } from '@/components/shared/EmptyItemsMessage'
import { useMask } from '@/utils/hooks/useMask'

const ORDER_ITEM_HEIGHT = 124

export function OrdersList() {
  const {
    orders,
    isLoading,
    customerDocument,
    personType,
    documentDialogRef,
    handleValidateDocument,
    handleEditCustomerDocument,
  } = useOrdersList()
  const router = useRouter()

  const mask = useMask(personType === 'natural' ? 'cpf' : 'cnpj')

  console.log(isLoading)
  console.log(orders?.length)

  return (
    <>
      <DocumentDialog
        ref={documentDialogRef}
        onValidateDocument={handleValidateDocument}
      />

      <XStack justifyContent="space-between" alignItems="center" mb={24}>
        <Text fontSize={20} fontWeight="600" color="$blue500">
          {mask(customerDocument)}
        </Text>
        <Button onPress={handleEditCustomerDocument}>Alterar documento</Button>
      </XStack>

      {isLoading ? (
        <FlatList
          data={computedOrdersMock}
          renderItem={({ item }) => (
            <View mb={24}>
              <OrderItem data={item} isLoading={true} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          disableIntervalMomentum={true}
          scrollEnabled={!isLoading}
        />
      ) : (
        <FlatList
          data={orders}
          extraData={isLoading}
          renderItem={({ item }) => (
            <View mb={24}>
              <OrderItem data={item} isLoading={false} />
            </View>
          )}
          ListEmptyComponent={
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
          }
          getItemLayout={(_, index) => ({
            index,
            length: ORDER_ITEM_HEIGHT,
            offset: ORDER_ITEM_HEIGHT + index,
          })}
          showsVerticalScrollIndicator={false}
          disableIntervalMomentum={true}
          scrollEnabled={!isLoading}
        />
      )}
    </>
  )
}
