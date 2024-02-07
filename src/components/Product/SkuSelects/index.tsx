import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'
import { Spinner } from 'tamagui'

import { useSkuSelects } from './useSkuSelects'

import type { Sku } from '@/@types/sku'
import { Select } from '@/components/Form/Select'

export type SkuSelectsRef = {
  selectedSku: Sku | null
  onAddSkuToCart: () => boolean
}

type SkuSelectsProps = {
  productId: string
  isDisabled?: boolean
  onSkuChange?: (sku: Sku) => void
}

export const SkuSelectsComponent = (
  { productId, isDisabled, onSkuChange }: SkuSelectsProps,
  ref: ForwardedRef<SkuSelectsRef>
) => {
  const {
    selectedSku,
    variations,
    variationNames,
    selectedVariationsValues,
    errors,
    isLoading,
    selectRefs,
    onAddSkuToCart,
    handleSelectChange,
    getVariationValuesByVariationName,
  } = useSkuSelects(productId, onSkuChange ?? null)

  useImperativeHandle(
    ref,
    () => {
      return {
        selectedSku,
        onAddSkuToCart,
      }
    },
    [selectedVariationsValues, selectedSku]
  )

  if (isLoading) return <Spinner size="large" color="$blue600" />

  if (variations.length)
    return (
      variationNames.length > 0 &&
      variationNames.map((variationName, index) => {
        const values = getVariationValuesByVariationName(variationName)
        const hasValues = values.length > 0

        return (
          <Select
            ref={(ref) => {
              if (ref) selectRefs.current[index] = ref
            }}
            key={variationName}
            label={variationName}
            width="100%"
            defaultValue={'Selecionar'}
            items={hasValues ? values : ['Selecionar']}
            onChange={(variationChange) =>
              handleSelectChange(index, variationChange)
            }
            isDisable={!hasValues || isDisabled}
            hasError={errors[index]}
          />
        )
      })
    )
}

export const SkuSelects = forwardRef(SkuSelectsComponent)
