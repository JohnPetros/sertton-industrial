import { ReactNode, useState } from 'react'
import { Text, YGroup, YStack } from 'tamagui'
import { DialogClose } from 'tamagui'

import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Dialog } from '@/components/Dialog'
import useBrands from '@/hooks/useBrands'
import { useProductsFilterStore } from '@/stores/productsFilterStore'

interface FiltersDialogProps {
  children: ReactNode
}

export function FiltersDialog({ children }: FiltersDialogProps) {
  const { brands } = useBrands()

  const checkedBrandsIds = useProductsFilterStore(
    (store) => store.state.brandsIds
  )
  const setProductBrandsIds = useProductsFilterStore(
    (store) => store.actions.setBrandsIds
  )
  const [brandsIds, setBrandsId] = useState<number[]>(checkedBrandsIds)

  function addBrandId(id: number) {
    setBrandsId([...brandsIds, id])
  }

  function removeBrandId(id: number) {
    setBrandsId(brandsIds.filter((brandId) => brandId !== id))
  }

  function handleBrandCheckbox(brandId: string, isChecked: boolean) {
    const id = Number(brandId)

    if (isChecked) {
      addBrandId(id)
    } else {
      removeBrandId(id)
    }
  }

  function handleDialogOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setTimeout(() => {
        setProductBrandsIds(brandsIds)
      }, 1500)
    }
  }

  if (brands)
    return (
      <Dialog
        onOpenChange={handleDialogOpenChange}
        title="Filtrar por"
        width={320}
        content={
          <YStack mt={12} pb={12}>
            <YGroup>
              <YGroup.Item>
                <Text fontSize={16} fontWeight="600" color="$gray900" mb={4}>
                  Marca
                </Text>
              </YGroup.Item>
              {brands.map((brand) => (
                <YGroup.Item key={brand.id}>
                  <Checkbox
                    value={String(brand.id)}
                    label={brand.name}
                    onChange={handleBrandCheckbox}
                    defaultChecked={checkedBrandsIds.includes(brand.id)}
                  />
                </YGroup.Item>
              ))}
            </YGroup>
            <DialogClose asChild>
              <Button mt={24}>Filtrar produtos</Button>
            </DialogClose>
          </YStack>
        }
      >
        {children}
      </Dialog>
    )
}
