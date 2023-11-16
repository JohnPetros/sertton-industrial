import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from 'react'
import { X } from 'phosphor-react-native'
import { Dialog as D, XStack } from 'tamagui'

import { Button } from '@/components/Button'

export type DialogRef = {
  close: () => void
}

interface DialogProps {
  title: string
  children: ReactNode
  content: ReactNode
  onOpenChange?: (isOpen: boolean) => void
}

export const DialogComponent = (
  { children, content, title, onOpenChange }: DialogProps,
  ref: ForwardedRef<DialogRef>
) => {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)

    if (onOpenChange) onOpenChange(isOpen)
  }

  function close() {
    setIsOpen(false)
  }

  useImperativeHandle(ref, () => {
    return {
      close,
    }
  })

  return (
    <D open={isOpen} onOpenChange={handleOpenChange}>
      <D.Portal>
        <D.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <D.Content
          py={16}
          px={24}
          maxWidth="90%"
          bordered
          elevate
          key="content"
        >
          <XStack justifyContent="space-between">
            <D.Title fontSize={16} color="$gray900" fontWeight="600">
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

export const Dialog = forwardRef(DialogComponent)
