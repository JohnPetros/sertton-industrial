import { useRef } from 'react'

import { AlertRef } from '@/components/Alert'
import { DialogRef } from '@/components/Dialog'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function useSignUpDialog() {
  const dialogRef = useRef<DialogRef | null>(null)
  const alertRef = useRef<AlertRef | null>(null)
  const resetState = useCheckoutStore((store) => store.actions.resetState)

  function handleAlertClose() {
    dialogRef.current?.close()
  }

  function handleDialogClose(isOpen: boolean) {
    if (!isOpen) {
      resetState()
    }
  }

  function handleSignUpSuccess() {
    alertRef.current?.open()
  }

  return {
    dialogRef,
    alertRef,
    handleAlertClose,
    handleDialogClose,
    handleSignUpSuccess,
  }
}
