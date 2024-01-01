import { useCheckoutStore } from '@/stores/checkoutStore'

export function useStep(isActive: boolean) {
  const color = isActive ? '$green500' : '$gray300'
  const setStep = useCheckoutStore((store) => store.actions.setStep)
  const currentStep = useCheckoutStore((store) => store.state.step)

  function handleStep(step: number) {
    const canChangeStep = step < currentStep

    if (canChangeStep) setStep(step)
  }

  return {
    color,
    handleStep,
  }
}
