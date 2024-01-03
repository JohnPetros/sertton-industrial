import { renderHook, waitFor } from '@testing-library/react-native'

import { useStep } from '@/components/Checkout/Steps/useStep'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'

const setStepMock = jest.fn()

describe('useStep hook', () => {
  beforeEach(() => {
    useCheckoutStore.setState({
      actions: { setStep: setStepMock },
    } as unknown as CheckoutStoreProps)
  })

  it('should return gray color when is not active', () => {
    const { result } = renderHook(() => useStep(false))

    expect(result.current.color).toBe('$gray300')
  })

  it('should return green color is active', () => {
    const { result } = renderHook(() => useStep(true))

    expect(result.current.color).toBe('$green500')
  })

  it('should set step when is active', async () => {
    const { result } = renderHook(() => useStep(true))

    await waitFor(async () => {
      await result.current.handleStep(1)
    })
    expect(setStepMock).toHaveBeenCalledWith(1)
  })

  it('should not set step to a number that is lower than the current step', async () => {
    const currentStep = 1

    useCheckoutStore.setState({
      actions: { setStep: setStepMock },
      state: { step: currentStep },
    } as unknown as CheckoutStoreProps)

    const { result } = renderHook(() => useStep(false))

    await waitFor(async () => {
      await result.current.handleStep(currentStep + 1)
    })
    expect(setStepMock).not.toHaveBeenCalledWith(currentStep + 1)
  })
})
