import { useState } from 'react'

import type { Variation } from '@/@types/variation'

type VariationsByName = {
  [name in string]: Variation[]
}

export function useVariations(variations: Variation[]) {
  const [selectedVariantionsIds, setSelectedVariantionsIds] = useState<
    number[]
  >([])
  const [variantionsByName, setVariantionsByName] =
    useState<VariationsByName | null>(null)

  function setVariations() {
    const variationNames: string[] = []

    for (const variation of variations) {
      if (!variationNames.includes(variation.name)) {
        variationNames.push(variation.name)
      }
    }
    // setVariationNames(variationNames)

    let variationsByName = {}
    const selectedVariantionsIds: number[] = []

    for (const variantionName of variationNames) {
      const selectedVariations: Variation[] = variations.filter(
        (variantion) => (variantion.name = variantionName)
      )

      if (selectedVariations.length) {
        variationsByName = {
          ...variationsByName,
          [variantionName]: selectedVariations,
        }

        selectedVariantionsIds.push(selectedVariations[0].id)
      }
    }

    console.log(variationsByName)

    setVariantionsByName(variationsByName)
    setSelectedVariantionsIds(selectedVariantionsIds)
  }

  function handleSelectedVariationChange(variationValue: string) {
    console.log(variationValue)
  }

  return {
    variantionsByName,
    selectedVariantionsIds,
    setVariations,
    handleSelectedVariationChange,
  }
}
