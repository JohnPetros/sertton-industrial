import { useEffect, useRef } from 'react'

import { DialogRef } from '@/components/Dialog'
import { useCustomerContext } from '@/contexts/CustomerContext'

export function useCheckoutForm() {
  const emailDialogRef = useRef<DialogRef | null>(null)
  const { customer } = useCustomerContext()

  function handleEmailDialogFallback() {
    emailDialogRef.current?.close()
  }

  useEffect(() => {
    if (!customer && emailDialogRef.current) {
      emailDialogRef.current.open()
    }
  }, [customer, emailDialogRef.current])

  return {
    emailDialogRef,
    handleEmailDialogFallback,
  }
}
