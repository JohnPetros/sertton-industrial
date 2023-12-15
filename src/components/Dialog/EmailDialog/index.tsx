import { ForwardedRef, forwardRef, ReactNode, useImperativeHandle } from 'react'
import { Text, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Dialog, DialogRef } from '@/components/Dialog'
import { useEmailDialog } from '@/components/Dialog/EmailDialog/useEmailDialog'
import { Input } from '@/components/Form/Input'

interface EmailDialogProps {
  fallback: ReactNode
}

export const EmailDialogComponent = (
  { fallback }: EmailDialogProps,
  ref: ForwardedRef<DialogRef>
) => {
  const {
    email,
    error,
    dialogRef,
    open,
    close,
    handleEmailChange,
    handleSubmit,
  } = useEmailDialog()

  useImperativeHandle(ref, () => {
    return {
      close,
      open,
    }
  })

  return (
    <Dialog
      ref={dialogRef}
      title="Identifique-se"
      width={320}
      content={
        <YStack gap={24}>
          <Text>
            Utlizaremos seu e-mail para usarmos seus dados de cadastro.
          </Text>
          <Input
            label="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Exemplo: maria@gmail.com"
            value={email}
            onChangeText={handleEmailChange}
            error={error}
          />
          <Button onPress={handleSubmit}>Continuar</Button>
          {fallback}
        </YStack>
      }
    >
      {null}
    </Dialog>
  )
}

export const EmailDialog = forwardRef(EmailDialogComponent)
