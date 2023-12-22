import { ForwardedRef, forwardRef, ReactNode, useImperativeHandle } from 'react'
import { AlertDialog, XStack } from 'tamagui'

import { useAlert } from '@/components/Alert/useAlert'
import { Button } from '@/components/Button'

export interface AlertRef {
  close: () => void
  open: () => void
}

interface AlertProps {
  title: string
  onConfirm: () => void
  onClose?: () => void
  children?: ReactNode
}

export const AlertComponent = (
  { onConfirm, onClose, title, children: trigger }: AlertProps,
  ref: ForwardedRef<AlertRef>
) => {
  const { open, close, handleOpenChange, isOpen } = useAlert(onClose)

  useImperativeHandle(ref, () => {
    return {
      close,
      open,
    }
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -40, opacity: 0 }}
          exitStyle={{ x: 0, y: -40, opacity: 0 }}
          x={0}
          y={0}
          opacity={1}
          borderRadius={4}
          p={24}
          w={360}
          bg="$gray50"
        >
          <AlertDialog.Title
            fontSize={16}
            textAlign="center"
            lineHeight={24}
            color="$gray800"
          >
            {title}
          </AlertDialog.Title>
          <XStack alignItems="center" justifyContent="center" gap={12} mt={24}>
            <AlertDialog.Cancel asChild w={120}>
              <Button background="secondary">Cancelar</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button onPress={() => onConfirm()} w={120}>
                Confirmar
              </Button>
            </AlertDialog.Action>
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
    </AlertDialog>
  )
}

export const Alert = forwardRef(AlertComponent)