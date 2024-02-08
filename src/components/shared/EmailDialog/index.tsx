import { ForwardedRef, forwardRef, ReactNode, useImperativeHandle } from 'react'
import { Paragraph, YStack } from 'tamagui'

import type { DialogRef } from '../Dialog/types/DialogRef'

import { useEmailDialog } from './useEmailDialog'

import { Button } from '@/components/shared/Button'
import { Dialog } from '@/components/shared/Dialog'
import { Input } from '@/components/shared/Input'

interface EmailDialogProps {
  fallback: ReactNode
  label: string
}

export const EmailDialogComponent = (
  { fallback, label }: EmailDialogProps,
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
          <Paragraph>{label}</Paragraph>
          <Input
            label="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Exemplo: maria@gmail.com"
            value={email}
            onChangeText={handleEmailChange}
            error={error}
          />
          <Button onPress={handleSubmit}>Buscar dados de cadastro</Button>
          {fallback}
        </YStack>
      }
    >
      {null}
    </Dialog>
  )
}

export const EmailDialog = forwardRef(EmailDialogComponent)
