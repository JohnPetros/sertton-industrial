import { useQuery } from 'react-query'

import { useApi } from '@/services/api'

export function useCollections() {
  const api = useApi()

  async function getProductsByCollection(collectionId: number) {
    return await api.getProductsByCollection(collectionId)
  }

  async function getCollections() {
    const collections = await api.getCollections()

    if (collections.length) {
      const result = []
      for (const collection of collections) {
        const products = await getProductsByCollection(collection.id)

        result.push({
          ...collection,
          products,
        })
      }

      return result
    }

    return []
  }

  const { data, error, isLoading } = useQuery('collections', () =>
    getCollections()
  )

  return {
    collections: data,
    error,
    isLoading,
  }
}
