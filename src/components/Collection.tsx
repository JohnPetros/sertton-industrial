import { FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { Button, H2, YStack } from 'tamagui'

import { Collection as CollectionData } from '@/@types/collection'
import { ProductItem } from '@/components/ProductItem'
import { Skeleton } from '@/components/Skeleton'

interface CollectionProps {
  data: CollectionData
  isLoading: boolean
}

export function Collection({
  data: { name, products },
  isLoading,
}: CollectionProps) {
  const router = useRouter()

  function handleProduct(productId: number) {
    router.push(`/(drawer)/product/${productId}`)
  }

  return (
    <YStack>
      <Skeleton isVisible={!isLoading} mb={isLoading ? 12 : 0}>
        <H2 color="$blue500" fontSize={24} mb={12}>
          {name}
        </H2>
      </Skeleton>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Button
            unstyled
            key={item.id}
            mr={24}
            onPress={() => handleProduct(item.id)}
          >
            <ProductItem
              data={item}
              isLoading={isLoading}
              isColumn={true}
              width={150}
            />
          </Button>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </YStack>
  )
}
