import { ReactNode } from 'react'
import { AlertDialog, XStack } from 'tamagui'

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
          enterStyle={{ x: 0, y: -40, opacity: 0 }}
          exitStyle={{ x: 0, y: -40, opacity: 0 }}
          x={0}
          y={0}
          opacity={1}
          borderRadius={4}
          p={12}
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
              <Button onPress={handleConfirm} w={120}>
                Confirmar
              </Button>
            </AlertDialog.Action>
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>

      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
    </AlertDialog>
  )
}
