import { useState } from 'react'

import { useCheckoutStore } from '@/stores/checkoutStore'

export function useStep(isActive: boolean) {
  const color = isActive ? '$green500' : '$gray300'
  const setStep = useCheckoutStore((store) => store.actions.setStep)
  const currentStep = useCheckoutStore((store) => store.state.step)

  const [isLoading, setIsLoading] = useState(false)

  async function handleStep(step: number) {
    const canChangeStep = step < currentStep

    if (canChangeStep) {
      setIsLoading(true)
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true)
        }, 500)
      })

      setStep(step)
      setIsLoading(false)
    }
  }

  return {
    color,
    isLoading,
    handleStep,
  }
}
