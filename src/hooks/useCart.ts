import { useQuery } from 'react-query'

import { useApi } from '@/services/api'
import { useCartStore } from '@/stores/cartStore'

export function useCart() {
  const items = useCartStore((store) => store.state.items)
  const api = useApi()

  async function getCartProducts() {
    const products = []

    for (const item of items) {
      const product = await api.getProductBySlug(item.slug)
      if (product)
        products.push({
          ...product,
          quantity: item.quantity,
          selectedSkuId: item.skuId,
        })
    }

    return products
  }

  const { data, error, isLoading } = useQuery(
    ['cart-products', items],
    getCartProducts
  )

  return {
    products: data,
    totalCartItems: items.length,
    error,
    isLoading,
  }
}
