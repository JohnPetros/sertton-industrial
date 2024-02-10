import { renderHook } from '@testing-library/react-native'

import { useCheckoutForm } from '../useCheckoutForm'

import { customerMock } from '@/_tests_/mocks/customerMock'
import {
  CustomerContextValue,
  useCustomerContext,
} from '@/contexts/CustomerContext'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'

jest.mock('../../../contexts/CustomerContext')

const openEmailDialogMock = jest.fn()

const setStepMock = jest.fn()

describe('useCheckout hook', () => {
  beforeEach(() => {
    useCheckoutStore.setState({
      actions: { setStep: setStepMock },
    } as unknown as CheckoutStoreProps)
  })

  it('should go to step 2 when there is a customer', () => {
    jest.mocked(useCustomerContext).mockReturnValueOnce({
      customer: customerMock,
    } as unknown as CustomerContextValue)

    renderHook(useCheckoutForm)

    expect(setStepMock).toHaveBeenCalledWith(2)
  })

  it('should open dialog when there is not a customer', () => {
    jest.mocked(useCustomerContext).mockReturnValueOnce({
      customer: null,
    } as unknown as CustomerContextValue)

    renderHook(() => useCheckoutForm(openEmailDialogMock))

    expect(openEmailDialogMock).toHaveBeenCalled()
  })
})
