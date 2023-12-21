import { ReactNode } from 'react'
import { CaretDown } from 'phosphor-react-native'
import { getTokens, XStack, YStack } from 'tamagui'

import { useAccordion } from '@/components/Accordion/useAccordion'
import { Button } from '@/components/Button'

interface AccordionProps {
  label: ReactNode
  children: ReactNode
}

export function Accordion({ children, label }: AccordionProps) {
  const { isOpen, handleOpen } = useAccordion()

  return (
    <YStack
      borderRadius={4}
      bg={isOpen ? '$white' : '$gray100'}
      px={24}
      py={12}
      w="100%"
    >
      <XStack justifyContent="space-between">
        {label}
        <Button
          x={24}
          onPress={handleOpen}
          background="transparent"
          icon={<CaretDown color={getTokens().color.gray400.val} size={24} />}
        />
      </XStack>
      {isOpen && children}
    </YStack>
  )
}
