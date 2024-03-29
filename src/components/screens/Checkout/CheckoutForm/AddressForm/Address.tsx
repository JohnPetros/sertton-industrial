import { Pencil, Trash } from 'phosphor-react-native'
import { getTokens, Text, XStack, YStack } from 'tamagui'

import { Alert } from '@/components/shared/Alert'
import { Button } from '@/components/shared/Button'

interface AddressProps {
  zipcode: string
  number: string
  uf: string
  neighborhood: string
  street: string
  city: string
  onEdit: (zipcode: string) => void
  onDelete: (zipcode: string) => void
}

export function Address({
  zipcode,
  number,
  city,
  uf,
  neighborhood,
  street,
  onEdit,
  onDelete,
}: AddressProps) {
  return (
    <XStack testID={zipcode}>
      <YStack w={140} flexShrink={1}>
        <Text color="$blue800" fontWeight="600">
          {street}, {number} - {neighborhood}
        </Text>
        <Text color="$gray400" flexWrap="wrap" flexShrink={0}>
          {zipcode} | {city} - {uf}
        </Text>
      </YStack>
      <XStack h="100%" alignItems="flex-start">
        <Button
          testID={`edit-button-${zipcode}`}
          background="transparent"
          onPress={() => onEdit(zipcode)}
        >
          <YStack alignItems="center">
            <Pencil color={getTokens().color.gray400.val} />
            <Text fontSize={12} color="$gray400" fontWeight="600">
              Editar
            </Text>
          </YStack>
        </Button>
        <Alert
          title="Tem certeza que deseja excluir esse endereço?"
          onConfirm={() => onDelete(zipcode)}
        >
          <Button testID={`delete-button-${zipcode}`} background="transparent">
            <YStack alignItems="center">
              <Trash color={getTokens().color.gray400.val} />
              <Text fontSize={12} color="$gray400" fontWeight="600">
                Excluir
              </Text>
            </YStack>
          </Button>
        </Alert>
      </XStack>
    </XStack>
  )
}
