import { useEffect } from 'react'

import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCheckoutStore } from '@/stores/checkoutStore'

export function useCheckoutForm(openEmailDialog: (() => void) | null) {
  const { customer } = useCustomerContext()
  const setStep = useCheckoutStore(({ actions }) => actions.setStep)

  useEffect(() => {
    if (!customer && openEmailDialog) {
      openEmailDialog()
      return
    }
  }, [customer, openEmailDialog])

  useEffect(() => {
    if (customer) setStep(2)
  }, [])
}
