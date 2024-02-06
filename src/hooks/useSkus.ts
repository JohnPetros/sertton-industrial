import { useRef, useState } from 'react'
import { useQuery } from 'react-query'

import type { Sku } from '@/@types/sku'
import type { Variation } from '@/@types/variation'
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus'
import { useApi } from '@/services/api'
import { removeObjectFromArray } from '@/utils/helpers/removeObjectFromArray'

export function useSkus(productId: string) {
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const [variations, setVariations] = useState<Variation[]>([])
  const variationNames = useRef<string[]>([])
  const selectedVariationsValues = useRef<string[]>([])
  const api = useApi()

  const { data: skus, refetch } = useQuery(
    [`skus?product_id=${productId}`, productId],
    () => api.getSkusByProductId(productId),
    {
      enabled: !!productId,
    }
  )

  useRefetchOnFocus({ refetch })

  function getVariationValuesByVariationName(variationName: string) {
    return (
      variations
        .filter((variation) => variation.name === variationName)
        .map((variation) => variation.value) ?? []
    )
  }

  function getAllVariations() {
    if (!skus) return []

    const allVariations: Variation[] = []

    for (const sku of skus) {
      allVariations.push(...sku.variations)
    }

    return allVariations
  }

  function getVariationNames(variations: Variation[]) {
    const variationNames: string[] = []

    for (const variation of variations) {
      if (!variationNames.includes(variation.name)) {
        variationNames.push(variation.name)
      }
    }

    return variationNames
  }

  function checkSkuMatch(
    selectedVariationValue: string,
    variationValue: string
  ) {
    if (!skus) return false

    return skus.some((sku) => {
      const selectedVariation = sku.variations.find(
        (variation) => variation.value === selectedVariationValue
      )

      const currentVariation = sku.variations.find(
        (variation) => variation.value === variationValue
      )

      if (selectedVariation && currentVariation) return true
    })
  }

  function removeRemainingVariations(firstVariationName: string) {
    const allVariations = getAllVariations()

    const nonRemainingvariations: Variation[] = []

    for (const variation of allVariations) {
      const isAlreadyIncluded = nonRemainingvariations.some(
        (currentVariation) => currentVariation.value === variation.value
      )
      if (!isAlreadyIncluded && variation.name === firstVariationName) {
        nonRemainingvariations.push(variation)
      }
    }

    return nonRemainingvariations ? nonRemainingvariations : []
  }

  function insertRemainingVariations(
    selectedVariationValue: string,
    firstVariationName: string
  ) {
    const allVariations = getAllVariations()

    const nonRemainingvariations = removeRemainingVariations(firstVariationName)

    const remainingVariations = allVariations.filter(
      (variation) => variation.name !== firstVariationName
    )

    const variations: Variation[] = []

    for (const variation of remainingVariations) {
      const isFirstVariationName = variation.name === firstVariationName
      const shouldPush = !variations.some(
        (currentCariation) => currentCariation.value === variation.value
      )

      const hasSkuMatch = checkSkuMatch(selectedVariationValue, variation.value)

      if (!isFirstVariationName && shouldPush && hasSkuMatch) {
        variations.push(variation)
      }
    }

    setVariations(variations.concat(nonRemainingvariations))
  }

  function getFirstVariationName(
    variationNames: string[],
    allVariations: Variation[]
  ) {
    const variationNamesAmount = variationNames.length

    for (const variation of allVariations) {
      const variationsMatchesAmount = allVariations.filter(
        (currentVariation) => currentVariation.value === variation.value
      ).length

      if (variationsMatchesAmount === variationNamesAmount) {
        return variation.name
      }
    }

    return variationNames[0]
  }

  function setSkusVariations(skus: Sku[]) {
    selectedVariationsValues.current = []
    variationNames.current = []

    const allVariations = getAllVariations()

    if (!allVariations) return

    variationNames.current = getVariationNames(allVariations)

    const firstVariationName = getFirstVariationName(
      variationNames.current,
      allVariations
    )

    removeObjectFromArray<string>(variationNames.current, firstVariationName)

    variationNames.current.unshift(firstVariationName)

    const nonRemainingvariations = removeRemainingVariations(firstVariationName)
    setVariations(nonRemainingvariations)

    const selectedSku = skus[0]
    setSelectedSku(selectedSku)
  }

  function handleSelectedVariationChange(
    selectedVariationValue: string,
    currentSelectedVariationValues: string[]
  ) {
    const selectedVariation = variations.find(
      (variation) => variation.value === selectedVariationValue
    )

    if (selectedVariation) {
      selectedVariationsValues.current = [
        ...currentSelectedVariationValues,
        selectedVariationValue,
      ]
      const selectedSku = getSelectedSku()

      const allVariations = getAllVariations()

      const firstVariationName = getFirstVariationName(
        variationNames.current,
        allVariations
      )

      const isFirstVariationName =
        selectedVariation?.name === firstVariationName

      if (isFirstVariationName) {
        insertRemainingVariations(selectedVariationValue, firstVariationName)
      }

      if (selectedSku && skus)
        setSelectedSku(selectedSku ? selectedSku : skus[0])
    }
  }

  function verifyVariationValuesMatch(sku: Sku) {
    const hasVariationValuesMatch = sku.variations.every((variation) => {
      return selectedVariationsValues.current.includes(variation.value)
    })

    if (hasVariationValuesMatch) {
      return true
    }

    return false
  }

  function getSelectedSku() {
    if (!skus) return

    return skus.find(verifyVariationValuesMatch) ?? skus[0]
  }

  return {
    selectedSku,
    skus,
    variations,
    variationNames: variationNames.current,
    selectedVariationsValues: selectedVariationsValues.current,
    getVariationValuesByVariationName,
    setSkusVariations,
    handleSelectedVariationChange,
  }
}
