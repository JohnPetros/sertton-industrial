import { Text, View } from 'tamagui'

interface ItemsQuantityBadgeProps {
  quantity: number
  isActive: boolean
}

export function ItemsQuantityBadge({
  quantity,
  isActive,
}: ItemsQuantityBadgeProps) {
  if (quantity)
    return (
      <View
        position="absolute"
        bg={isActive ? '$white' : '$blue400'}
        w={24}
        h={24}
        borderRadius={12}
        top={-8}
        right={-8}
        zIndex={50}
        alignItems="center"
        justifyContent="center"
        elevationAndroid={1}
      >
        <Text color={isActive ? '$blue400' : '$white'}>{quantity}</Text>
      </View>
    )
}
