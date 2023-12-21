import { ReactNode, useRef } from 'react'
import { Alert } from 'react-native'
import { YStack } from 'tamagui'

import { PersonForm } from '@/components/CheckoutForm/PersonForm'
import { Dialog, DialogRef } from '@/components/Dialog'

interface SignUpDialogProps {
  children: ReactNode
}

export function SignUpDialog({ children: trigger }: SignUpDialogProps) {
  const dialogRef = useRef<DialogRef>(null)

  return (
    <Dialog
      ref={dialogRef}
      title="Preencha seus dados"
      width={320}
      content={
        <YStack gap={24} h={600}>
          <PersonForm
            onSuccess={() =>
              Alert.alert('Mensagem', 'Cadastro feito com sucesso!', [
                {
                  text: 'Entendido',
                  onPress: () => dialogRef.current?.close(),
                },
              ])
            }
          />
        </YStack>
      }
    >
      {trigger}
    </Dialog>
  )
}
