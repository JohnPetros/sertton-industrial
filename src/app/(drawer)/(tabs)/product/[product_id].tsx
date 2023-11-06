import { useGlobalSearchParams } from 'expo-router/src/hooks'
import { Text, YStack } from 'tamagui'

export default function Product() {
  const { product_id } = useGlobalSearchParams()

  return (
    <YStack>
      <Text>{product_id}</Text>
    </YStack>
  )
}
