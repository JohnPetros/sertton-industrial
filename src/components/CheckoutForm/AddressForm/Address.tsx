import { Pencil, Trash } from 'phosphor-react-native'
import { getTokens, Text, XStack, YStack } from 'tamagui'

import { Button } from '@/components/Button'

interface AddressProps {
  zipCode: string
  number: string
  uf: string
  neighborhood: string
  street: string
  city: string
  onEdit: (zipcode: string) => void
  onDelete: (zipcode: string) => void
}

export function Address({
  zipCode,
  number,
  city,
  uf,
  neighborhood,
  street,
  onEdit,
  onDelete,
}: AddressProps) {
  return (
    <XStack>
      <YStack w={140} flexShrink={1}>
        <Text color="$blue800" fontWeight="600">
          {street}, {number} - {neighborhood}
        </Text>
        <Text color="$gray400" flexWrap="wrap" flexShrink={0}>
          {zipCode} | {city} - {uf}
        </Text>
      </YStack>
      <XStack h="100%" alignItems="flex-start">
        <Button background="transparent" onPress={() => onEdit(zipCode)}>
          <YStack alignItems="center">
            <Pencil color={getTokens().color.gray400.val} />
            <Text fontSize={12} color="$gray400" fontWeight="600">
              Editar
            </Text>
          </YStack>
        </Button>
        <Button background="transparent" onPress={() => onDelete(zipCode)}>
          <YStack alignItems="center">
            <Trash color={getTokens().color.gray400.val} />
            <Text fontSize={12} color="$gray400" fontWeight="600">
              Excluir
            </Text>
          </YStack>
        </Button>
      </XStack>
    </XStack>
  )
}
