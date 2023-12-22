import { ReactNode } from 'react'
import { YStack } from 'tamagui'

import { Alert } from '@/components/Alert'
import { PersonForm } from '@/components/CheckoutForm/PersonForm'
import { Dialog } from '@/components/Dialog'
import { useSignUpDialog } from '@/components/Dialog/SignUpDialog/useSignUpDialog'
import { SCREEN } from '@/utils/constants/screen'

interface SignUpDialogProps {
  children: ReactNode
}

export function SignUpDialog({ children: trigger }: SignUpDialogProps) {
  const {
    alertRef,
    dialogRef,
    handleAlertClose,
    handleDialogClose,
    handleSignUpSuccess,
  } = useSignUpDialog()

  return (
    <>
      <Alert
        ref={alertRef}
        title="Cadastro realizado com sucesso!"
        onCancel={handleAlertClose}
        onConfirm={handleAlertClose}
      />
      <Dialog
        ref={dialogRef}
        title="Preencha seus dados"
        width={SCREEN.width - SCREEN.paddingX * 2}
        onOpenChange={handleDialogClose}
        content={
          <YStack gap={24} h={550}>
            <PersonForm onSuccess={handleSignUpSuccess} />
          </YStack>
        }
      >
        {trigger}
      </Dialog>
    </>
  )
}
