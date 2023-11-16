import { ReactNode } from 'react'
import { XStack } from 'tamagui'

import { Cell } from '@/components/Table/Cell'

interface RowProps {
  cells: ReactNode[]
}

export function Row({ cells }: RowProps) {
  return (
    <XStack alignItems="center">
      {cells.map((cell, index) => (
        <Cell key={`cell-${index}`}>{cell}</Cell>
      ))}
    </XStack>
  )
}
