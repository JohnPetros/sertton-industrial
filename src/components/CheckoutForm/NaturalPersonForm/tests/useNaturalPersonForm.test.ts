import { act, renderHook } from '@testing-library/react-native'

import { naturalPersonMock } from '@/__tests__/mocks/naturalPersonMock'
import { useNaturalPesonForm } from '@/components/CheckoutForm/NaturalPersonForm/useNaturalPersonForm'
import { NaturalPersonFormFields } from '@/libs/zod'
import {
  CheckoutStoreProps,
  initialCheckoutStoreState,
  useCheckoutStore,
} from '@/stores/checkoutStore'

const setStepMock = jest.fn()
const onSubmitMock = jest.fn()
const changeHandlerMock = jest.fn()
const setPersonFormDataMock = jest.fn()

function mockUseCheckoutStore(naturalPersonMock: NaturalPersonFormFields) {
  useCheckoutStore.setState({
    actions: { setStep: setStepMock, setPersonFormData: setPersonFormDataMock },
    state: {
      personFormData: {
        naturalPerson: naturalPersonMock,
      },
    },
  } as unknown as CheckoutStoreProps)
}

describe('useNaturalPersonForm hook', () => {
  beforeEach(() => {
    act(() => {
      useCheckoutStore.setState({ state: initialCheckoutStoreState })
    })
  })

  it('should return natural person form handlers', () => {
    mockUseCheckoutStore(naturalPersonMock)

    const { result } = renderHook(() => useNaturalPesonForm(onSubmitMock))

    expect(result.current.handleInputChange).toBeInstanceOf(Function)
    expect(result.current.handleSubmit).toBeInstanceOf(Function)
    expect(result.current.isSubmitting).toBe(false)
  })

  it('should change form fields', () => {
    mockUseCheckoutStore(naturalPersonMock)

    const { result } = renderHook(() => useNaturalPesonForm(onSubmitMock))

    const fieldValue = 'field value mock'
    const fieldName = 'cpf'

    act(() => {
      result.current.handleInputChange(changeHandlerMock, fieldValue, fieldName)
    })

    expect(changeHandlerMock).toHaveBeenCalledWith(fieldValue)
    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'natural',
      fieldName,
      fieldValue
    )
  })
})
