import { ReactNode } from 'react'
import { RadioGroup } from 'tamagui'

interface AddressProps {
  children: ReactNode
  onSelectedAddressChange: (selectedAddressZipcode: string) => void
}

export function AddressesRadioGroup({
  children,
  onSelectedAddressChange,
}: AddressProps) {
  return (
    <RadioGroup
      value="selected-address"
      gap={12}
      onValueChange={onSelectedAddressChange}
    >
      {children}
    </RadioGroup>
  )
}
