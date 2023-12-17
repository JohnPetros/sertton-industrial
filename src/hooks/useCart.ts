import { useQuery } from 'react-query'

import type { ComputedProduct } from '@/@types/computedProduct'
import { useApi } from '@/services/api'
import { useCartStore } from '@/stores/cartStore'

export function useCart() {
  const items = useCartStore((store) => store.state.items)
  const removeAllItems = useCartStore((store) => store.actions.removeAllItems)

  const api = useApi()

  async function getCartProducts() {
    const products: ComputedProduct[] = []

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

  function handleRemoveAllItems() {
    removeAllItems()
  }

  function getSelectedSkus() {
    if (!data) return

    const selectedSkus = []

    for (const product of data) {
      const selectedSku = product.skus.data.find(
        (sku) => sku.id === product.selectedSkuId
      )

      if (selectedSku)
        selectedSkus.push({
          quantity: product.quantity,
          name: product.name,
          ...selectedSku,
        })
    }

    return selectedSkus
  }

  return {
    products: data,
    totalCartItems: items.length,
    error,
    isLoading,
    getSelectedSkus,
    handleRemoveAllItems,
  }
}
