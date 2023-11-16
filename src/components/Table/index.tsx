import React, { ReactNode } from 'react'
import { Heading, XStack, YStack } from 'tamagui'

import { Cell } from '@/components/Table/Cell'

interface TableProps {
  header: string[]
  children: ReactNode
}

export default function Table({ header, children }: TableProps) {
  return (
    <YStack>
      <XStack>
        {header.map((heading) => (
          <Cell key={heading}>
            <Heading fontWeight="600" textTransform="capitalize">
              {heading}
            </Heading>
          </Cell>
        ))}
      </XStack>
      {children}
    </YStack>
  )
}
