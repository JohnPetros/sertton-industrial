import { ForwardedRef, forwardRef, ReactNode, useImperativeHandle } from 'react'
import { X } from 'phosphor-react-native'
import { Dialog as D, XStack } from 'tamagui'

import { Button } from '@/components/Button'
import { useDialog } from '@/components/Dialog/useDialog'

export type DialogRef = {
  close: () => void
}

interface DialogProps {
  title: string
  children: ReactNode
  content: ReactNode
  width?: number
  height?: number
  onOpenChange?: (isOpen: boolean) => void
}

export const DialogComponent = (
  { children, content, title, width, height, onOpenChange }: DialogProps,
  ref: ForwardedRef<DialogRef>
) => {
  const { close, handleOpenChange, isOpen } = useDialog(onOpenChange ?? null)

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
          animation={'quick'}
          enterStyle={{ x: 0, y: -40, opacity: 0 }}
          exitStyle={{ x: 0, y: -40, opacity: 0 }}
          x={0}
          y={0}
          opacity={1}
          py={16}
          px={24}
          maxWidth="90%"
          bordered
          elevate
          key="content"
          w={width}
          h={height}
        >
          <XStack justifyContent="space-between">
            <D.Title fontSize={20} color="$gray900" fontWeight="600">
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
