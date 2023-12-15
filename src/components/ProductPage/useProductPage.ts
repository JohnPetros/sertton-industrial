import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { useFocusEffect, useRouter } from 'expo-router'
import { ScrollView } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { SkuSelectsRef } from '@/components/SkuSelects'
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus'
import { useApi } from '@/services/api'
import { useCartStore } from '@/stores/cartStore'
import { ROUTES } from '@/utils/constants/routes'

export function useProductPage(slug: string) {
  const api = useApi()

  const { data: product, refetch } = useQuery(['product', slug], () =>
    api.getProductBySlug(slug)
  )

  const { data: similarProducts } = useQuery(
    ['similiar_products', product?.id],
    () => api.getSimiliarProducts(String(product?.id)),
    {
      enabled: !!product?.id,
    }
  )

  useRefetchOnFocus({ refetch })

  const addItem = useCartStore((store) => store.actions.addItem)

  const [isLoading, setIsLoading] = useState(true)
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const skuSelectsRef = useRef<SkuSelectsRef | null>(null)
  const scrollRef = useRef<ScrollView | null>(null)
  const quantity = useRef(1)

  const router = useRouter()

  const hasVariations = Boolean(
    skuSelectsRef.current?.selectedSku?.variations.length
  )

  function handleSkuChange(sku: Sku) {
    setSelectedSku(sku)
  }

  function handleQuantityChange(newQuantity: number) {
    quantity.current = newQuantity
  }

  function handleAddToCart() {
    const shouldAddTocart = skuSelectsRef.current?.onAddSkuToCart()

    if (hasVariations && !shouldAddTocart) return

    if (product && selectedSku) {
      addItem({
        slug: product.slug,
        skuId: selectedSku.id,
        quantity: quantity.current,
      })
      router.push(ROUTES.cart)
    }
  }

  useEffect(() => {
    if (selectedSku) setIsLoading(false)

    console.log({ product })
  }, [selectedSku])

  useFocusEffect(
    useCallback(() => {
      return () => {
        console.log(quantity.current)

        setIsLoading(true)
        setSelectedSku(null)
        scrollRef.current?.scrollTo({ y: 0 })
        quantity.current = 1
      }
    }, [product])
  )

  return {
    product,
    similarProducts,
    scrollRef,
    skuSelectsRef,
    selectedSku,
    isLoading,
    hasVariations,
    quantity: quantity.current,
    handleAddToCart,
    handleQuantityChange,
    handleSkuChange,
  }
}
