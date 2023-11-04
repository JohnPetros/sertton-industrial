import { FlatList } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { Button, H2, View, YStack } from 'tamagui'

import { Collection as CollectionData } from '@/@types/collection'
import { Product } from '@/components/Product'

interface CollectionProps {
  data: CollectionData
}

export function Collection({ data: { name, products } }: CollectionProps) {
  const router = useRouter()

  function handleProduct(productId: number) {
    console.log(productId)
    router.push(`/(drawer)/product/${productId}`)
  }

  return (
    <YStack>
      <H2 color="$blue500" fontSize={24} mb={12}>
        {name}
      </H2>
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
            <Product data={item} />
          </Button>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </YStack>
  )
}
