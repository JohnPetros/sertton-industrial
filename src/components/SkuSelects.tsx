import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import type { Sku } from '@/@types/sku'
import { Select, SelectRef } from '@/components/Select'
import { useSkus } from '@/hooks/useSkus'

export type SkuSelectsRef = {
  selectedSku: Sku | null
  onAddSkuToCart: () => boolean
}

interface SkuSelectsProps {
  productId: number
  onSkuChange?: (sku: Sku) => void
}

export const SkuSelectsComponent = (
  { productId, onSkuChange }: SkuSelectsProps,
  ref: ForwardedRef<SkuSelectsRef>
) => {
  const {
    skus,
    selectedSku,
    variations,
    selectedVariationsValues,
    variationNames,
    setSkusVariations,
    handleSelectedVariationChange,
    getVariationValuesByVariationName,
  } = useSkus(productId)
  const selectRefs = useRef<SelectRef[]>([])
  const hasErrors = selectedVariationsValues.length !== variationNames.length
  const [errors, setErrors] = useState<boolean[]>([])

  function fillArray<Value>(value: Value, length: number) {
    return Array.from<Value>({ length }).fill(value)
  }

  function handleSelectChange(index: number, value: string) {
    const currentSelectedValues = [
      ...new Set(
        selectRefs.current
          .map((selectRef) => selectRef.value)
          .filter((currentValue) => !!currentValue && currentValue !== value)
      ),
    ]

    const isFirst = index === 0

    handleSelectedVariationChange(value, isFirst ? [] : currentSelectedValues)

    if (isFirst) {
      for (
        let refIndex = index + 1;
        refIndex < selectRefs.current.length;
        refIndex++
      ) {
        selectRefs.current[refIndex].reset()
      }
    }

    if (!hasErrors) setErrors(fillArray<boolean>(false, variationNames.length))
  }

  function onAddSkuToCart() {
    if (hasErrors) {
      const errors: boolean[] = []

      selectRefs.current.forEach((selectRef, index) => {
        const hasError = !selectRef.value

        errors[index] = hasError
      })

      setErrors(errors)
      return false
    }

    setErrors(fillArray<boolean>(false, variationNames.length))
    return true
  }

  useImperativeHandle(ref, () => {
    return {
      selectedSku,
      onAddSkuToCart,
    }
  })

  useEffect(() => {
    if (skus) setSkusVariations(skus)
  }, [skus])

  useEffect(() => {
    if (skus && onSkuChange) onSkuChange(selectedSku ?? skus[0])
  }, [skus, selectedSku, onSkuChange])

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
          isDisable={!hasValues}
          hasError={errors[index]}
        />
      )
    })
  )
}

export const SkuSelects = forwardRef(SkuSelectsComponent)
