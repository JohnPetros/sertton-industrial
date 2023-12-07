import { Pencil, Trash } from 'phosphor-react-native'
import { Circle, getTokens, RadioGroup, Text, XStack, YStack } from 'tamagui'

import { Button } from '@/components/Button'

interface AddressRadioItem {
  zipCode: string
  number: string
  uf: string
  neighborhood: string
  street: string
  city: string
  isSelected: boolean
}

export function AddressRadioItem({
  zipCode,
  number,
  city,
  uf,
  neighborhood,
  street,
  isSelected,
}: AddressRadioItem) {
  return (
    <RadioGroup.Item unstyled id={zipCode} flex={1} value={zipCode}>
      <XStack
        alignItems="center"
        justifyContent="space-between"
        borderColor={isSelected ? '$blue500' : '$colorTransparent'}
        borderWidth={1}
        borderRadius={4}
        p={12}
      >
        <Circle w={24} h={24} bg="$gray50" borderRadius={12}>
          {isSelected && (
            <Circle
              borderWidth={8}
              w={24}
              h={24}
              borderColor="$blue400"
              bg="$colorTransparent"
            />
          )}
        </Circle>
        <YStack w={140} flexShrink={1}>
          <Text color="$blue800" fontWeight="600">
            {street}, {number} - {neighborhood}
          </Text>
          <Text color="$gray400">
            {city} - {uf} | {zipCode}
          </Text>
        </YStack>
        <XStack h="100%" alignItems="flex-start">
          <Button background="transparent">
            <YStack alignItems="center">
              <Pencil color={getTokens().color.gray400.val} />
              <Text fontSize={12} color="$gray400" fontWeight="600">
                Editar
              </Text>
            </YStack>
          </Button>
          <Button background="transparent">
            <YStack alignItems="center">
              <Trash color={getTokens().color.gray400.val} />
              <Text fontSize={12} color="$gray400" fontWeight="600">
                Excluir
              </Text>
            </YStack>
          </Button>
        </XStack>
      </XStack>
    </RadioGroup.Item>
  )
}
