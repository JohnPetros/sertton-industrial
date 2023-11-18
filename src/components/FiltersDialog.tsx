import { ReactNode } from 'react'
import { Text, YGroup, YStack } from 'tamagui'
import { DialogClose } from 'tamagui'

import type { Brand } from '@/@types/brand'
import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Checkbox'
import { Dialog } from '@/components/Dialog'

interface FiltersDialogProps {
  brands: Brand[]
  children: ReactNode
}

export function FiltersDialog({ children, brands }: FiltersDialogProps) {
  function handleBrandCheckbox(brandId: string) {
    console.log(brandId)
  }

  return (
    <Dialog
      title="Filtrar por"
      width={320}
      content={
        <YStack mt={12} pb={12}>
          <YGroup>
            <YGroup.Item>
              <Text fontSize={16} fontWeight="600" color="$gray900" mb={12}>
                Marca
              </Text>
            </YGroup.Item>
            {brands.map((brand) => (
              <YGroup.Item key={brand.id}>
                <Checkbox
                  value={String(brand.id)}
                  label={brand.name}
                  onChange={handleBrandCheckbox}
                />
              </YGroup.Item>
            ))}
          </YGroup>
          <DialogClose asChild>
            <Button mt={24}>Ver produtos</Button>
          </DialogClose>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
