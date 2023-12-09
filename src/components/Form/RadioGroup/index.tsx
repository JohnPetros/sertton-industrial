import { ReactNode } from 'react'
import { RadioGroup as Group } from 'tamagui'

interface AddressProps {
  children: ReactNode
  value: string
  onChange: (value: string) => void
}

export function RadioGroup({ value, children, onChange }: AddressProps) {
  return (
    <Group value={value} gap={12} onValueChange={onChange}>
      {children}
    </Group>
  )
}
