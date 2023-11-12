import { ReactNode } from 'react'
import { AlertDialog, Spinner, XStack } from 'tamagui'

import { Button } from '@/components/Button'

interface AlertProps {
  title: string
  onConfirm: () => void
  children: ReactNode
}

export function Alert({ onConfirm, title, children }: AlertProps) {
  function handleConfirm() {
    onConfirm()
  }

  return (
    <AlertDialog>
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
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          borderRadius={4}
          bg="$gray50"
          p={12}
          w={320}
        >
          <AlertDialog.Title fontSize={16} textAlign="center" color="$gray800">
            {title}
          </AlertDialog.Title>
          <XStack alignItems="center" justifyContent="center" gap={12} mt={12}>
            <AlertDialog.Cancel asChild w={100}>
              <Button background="secondary">Cancelar</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button onPress={handleConfirm} w={100}>
                <Spinner size="small" color="$white" />
              </Button>
            </AlertDialog.Action>
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>

      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
    </AlertDialog>
  )
}
