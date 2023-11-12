import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import type { Sku } from '@/@types/sku'
import type { Variation } from '@/@types/variation'
import { useApi } from '@/services/api'

type VariationsByName = {
  [name in string]: {
    variations: Variation[]
    selectedVariationValueId: number
  }
}

export function useSkus(productId: number) {
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const [variationsByName, setVariationsByName] =
    useState<VariationsByName | null>(null)
  const api = useApi()

  const { data: skus } = useQuery(
    [`skus?product_id=${productId}`, productId],
    () => api.getSkusByProductId(productId),
    {
      enabled: !!productId,
    }
  )

  function setVariations(skus: Sku[]) {
    const variations: Variation[] = []

    for (const sku of skus) {
      variations.push(...sku.variations)
    }

    const variationNames: string[] = []

    for (const variation of variations) {
      if (!variationNames.includes(variation.name)) {
        variationNames.push(variation.name)
      }
    }

    let variationsByName = {}

    for (const variantionName of variationNames) {
      const selectedVariations: Variation[] = variations.filter(
        (variantion) => (variantion.name = variantionName)
      )

      if (selectedVariations.length) {
        variationsByName = {
          ...variationsByName,
          [variantionName]: {
            variations: selectedVariations,
            selectedVariationValueId: selectedVariations[0].value_id,
          },
        }
      }
    }

    setVariationsByName(variationsByName)
  }

  function getVariationByValue(value: string) {
    if (variationsByName) {
      const allVariations = []

      for (const { variations } of Object.values(variationsByName)) {
        allVariations.push(...variations)
      }

      return allVariations.find((variation) => variation.value === value)
    }
  }

  function handleSelectedVariationChange(variationValue: string) {
    const selectedVariation = getVariationByValue(variationValue)

    if (selectedVariation && variationsByName) {
      const selectedVariationsByName = variationsByName[selectedVariation.name]

      const updatedVariationsName = {
        ...variationsByName,
        [selectedVariation.name]: {
          ...selectedVariationsByName,
          selectedVariationValueId: selectedVariation.value_id,
        },
      }

      setVariationsByName(updatedVariationsName)
    }
  }

  function verifySkuValueIdMatch(sku: Sku) {
    if (!variationsByName) return

    for (const variationName of Object.keys(variationsByName)) {
      const selectedVariation = sku.variations.find(
        (variation) => variation.name === variationName
      )

      const hasVariationValueMatch =
        selectedVariation?.value_id ===
        variationsByName[variationName].selectedVariationValueId

      if (!hasVariationValueMatch) return false
    }

    return true
  }

  function selectSku() {
    if (!skus) return

    const selectedSku = skus.find(verifySkuValueIdMatch)

    if (selectedSku) setSelectedSku(selectedSku)
  }

  useEffect(() => {
    if (variationsByName) selectSku()
  }, [variationsByName])

  return {
    selectedSku,
    skus,
    variationsByName,
    setVariations,
    handleSelectedVariationChange,
  }
}
