import { ReactNode } from 'react'
import { YStack } from 'tamagui'

import { Dialog } from '../Dialog'

import { useSignUpDialog } from './useSignUpDialog'

import { PersonForm } from '@/components/screens/Checkout/CheckoutForm/PersonForm'
import { Alert } from '@/components/shared/Alert'
import { SCREEN } from '@/utils/constants/screen'

type SignUpDialogProps = {
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
