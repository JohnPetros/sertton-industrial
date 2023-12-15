import { useCheckoutStore } from '@/stores/checkoutStore'

export function useStep(isActive: boolean) {
  const color = isActive ? '$green500' : '$gray300'
  const setStep = useCheckoutStore((store) => store.actions.setStep)

  function handleStep(step: number) {
    setStep(step)
  }

  return {
    color,
    handleStep,
  }
}
