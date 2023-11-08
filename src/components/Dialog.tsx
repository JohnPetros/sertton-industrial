import { ReactNode } from 'react'
import { X } from 'phosphor-react-native'
import { Dialog as D, XStack } from 'tamagui'

import { Button } from '@/components/Button'

interface DialogProps {
  title: string
  children: ReactNode
  content: ReactNode
  onOpenChange?: (isOpen: boolean) => void
}

export function Dialog({
  children,
  content,
  title,
  onOpenChange,
}: DialogProps) {
  return (
    <D onOpenChange={onOpenChange}>
      <D.Portal>
        <D.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <D.Content py={16} px={24} bordered elevate key="content">
          <XStack justifyContent="space-between">
            <D.Title color="$gray900" fontWeight="600" fontSize={16}>
              {title}
            </D.Title>
            <D.Close asChild>
              <Button background="transparent" mr={-24}>
                <X />
              </Button>
            </D.Close>
          </XStack>
          {content}
        </D.Content>
      </D.Portal>
      <D.Trigger asChild>{children}</D.Trigger>
    </D>
  )
}
