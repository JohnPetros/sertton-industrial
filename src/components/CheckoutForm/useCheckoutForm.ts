import { useEffect, useRef } from 'react'

import { DialogRef } from '@/components/Dialog'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function useCheckoutForm() {
  const emailDialogRef = useRef<DialogRef | null>(null)
  const { customer } = useCustomerContext()
  const setStep = useCheckoutStore(({ actions }) => actions.setStep)

  function handleEmailDialogFallback() {
    emailDialogRef.current?.close()
  }

  useEffect(() => {
    if (!customer && emailDialogRef.current) {
      emailDialogRef.current.open()
      return
    }
  }, [customer, emailDialogRef.current])

  useEffect(() => {
    if (customer) setStep(2)
  }, [])

  return {
    emailDialogRef,
    handleEmailDialogFallback,
  }
}
