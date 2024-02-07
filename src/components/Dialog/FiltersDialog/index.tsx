import { ReactNode } from 'react'
import { Text, YGroup, YStack } from 'tamagui'

import type { Brand } from '@/@types/brand'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Dialog } from '@/components/Dialog'
import { useFiltersDialog } from '@/components/Dialog/FiltersDialog/useFiltersDialog'

interface FiltersDialogProps {
  brands: Brand[]
  children: ReactNode
}

export function FiltersDialog({ children, brands }: FiltersDialogProps) {
  const {
    checkedBrandsIds,
    dialogRef,
    handleBrandCheckbox,
    handleDialogOpenChange,
    handleFilterButton,
  } = useFiltersDialog(brands)

  console.log({ brands })

  return (
    <Dialog
      ref={dialogRef}
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
            {brands &&
              brands.map((brand) => (
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
          <Button onPress={handleFilterButton} mt={24}>
            Filtrar produtos
          </Button>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
