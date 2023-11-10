import { useQuery } from 'react-query'

import type { CartItem } from '@/@types/cartItem'
import { useApi } from '@/services/api'

export function useCart(items: CartItem[]) {
  const api = useApi()

  async function getCartProducts() {
    const products = []

    for (const item of items) {
      const product = await api.getProductBySlug(item.slug)
      if (product) products.push({ ...product, selectedSkuId: item.skuId })
    }

    return products
  }

  const { data, error, isLoading } = useQuery(
    ['cart-products', items],
    getCartProducts
  )

  return {
    products: data,
    error,
    isLoading,
  }
}
