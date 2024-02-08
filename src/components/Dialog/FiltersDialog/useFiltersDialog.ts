import { useRef } from 'react'

import { Brand } from '@/@types/brand'
import { DialogRef } from '@/components/Dialog'
import { useProductsFilterStore } from '@/stores/productsFilterStore'

export function useFiltersDialog(brands: Brand[]) {
  const checkedBrandsIds = useProductsFilterStore(
    (store) => store.state.brandsIds
  )
  const setProductBrandsIds = useProductsFilterStore(
    (store) => store.actions.setBrandsIds
  )
  const brandsIds = useRef<string[]>(checkedBrandsIds)
  const dialogRef = useRef<DialogRef | null>(null)

  function addBrandId(id: string) {
    brandsIds.current = [...brandsIds.current, id]
  }

  function removeBrandId(id: string) {
    brandsIds.current = brandsIds.current.filter((brandId) => brandId !== id)
  }

  function handleBrandCheckbox(brandId: string, isChecked: boolean) {
    const id = brandId

    if (isChecked) {
      addBrandId(id)
    } else if (!isChecked) {
      removeBrandId(id)
    }
  }

  function handleDialogOpenChange() {
    brandsIds.current = checkedBrandsIds
  }

  async function handleFilterButton() {
    dialogRef.current?.close()

    await new Promise((resolve) => {
      setTimeout(() => {
        setProductBrandsIds(brandsIds.current)
        resolve(true)
      }, 500)
    })
  }

  return {
    brands,
    checkedBrandsIds,
    dialogRef,
    handleBrandCheckbox,
    handleDialogOpenChange,
    handleFilterButton,
  }
}
