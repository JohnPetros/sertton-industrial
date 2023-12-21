import { renderHook } from '@testing-library/react-native'

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

  it('should set step', () => {
    const { result } = renderHook(() => useStep(true))

    result.current.handleStep(1)
    expect(setStepMock).toHaveBeenCalledWith(1)
  })
})
