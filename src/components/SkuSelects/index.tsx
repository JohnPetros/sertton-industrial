import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Spinner } from 'tamagui'

import type { Sku } from '@/@types/sku'
import { Select, SelectRef } from '@/components/Form/Select'
import { useSkus } from '@/hooks/useSkus'

export type SkuSelectsRef = {
  selectedSku: Sku | null
  onAddSkuToCart: () => boolean
}

interface SkuSelectsProps {
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
    skus,
    variations,
    variationNames,
    selectedVariationsValues,
    getVariationValuesByVariationName,
    setSkusVariations,
    handleSelectedVariationChange,
  } = useSkus(productId)
  const selectRefs = useRef<SelectRef[]>([])

  const [errors, setErrors] = useState<boolean[]>([])
  const [isLoading, setIsloading] = useState(true)

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

    const hasErrors = selectedVariationsValues.length !== variationNames.length

    if (!hasErrors) setErrors(fillArray<boolean>(false, variationNames.length))
  }

  function onAddSkuToCart() {
    const hasErrors = selectedVariationsValues.length !== variationNames.length

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

  useEffect(() => {
    if (skus) {
      setSkusVariations(skus)
      if (selectRefs.current.length) selectRefs.current[0].reset()
    }
  }, [skus])

  useEffect(() => {
    if (productId && skus && onSkuChange) {
      onSkuChange(selectedSku ?? skus[0])
    }
  }, [productId, skus, selectedSku, onSkuChange])

  useEffect(() => {
    if (isLoading) setIsloading(false)
  }, [isLoading])

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
