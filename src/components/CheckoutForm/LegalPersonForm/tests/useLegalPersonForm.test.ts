import { act, renderHook } from '@testing-library/react-native'

import { useLegalPesonForm } from '@/components/CheckoutForm/LegalPersonForm/useLegalPersonForm'
import { LegalPersonFormFields } from '@/libs/zod'
import {
  CheckoutStoreProps,
  initialCheckoutStoreState,
  useCheckoutStore,
} from '@/stores/checkoutStore'
import { legalPersonMock } from '@/tests/mocks/legalPersonMock'

const setStepMock = jest.fn()
const onSubmitMock = jest.fn()
const changeHandlerMock = jest.fn()
const setPersonFormDataMock = jest.fn()

function mockUseCheckoutStore(legalPersonMock: LegalPersonFormFields) {
  useCheckoutStore.setState({
    actions: { setStep: setStepMock, setPersonFormData: setPersonFormDataMock },
    state: {
      personFormData: {
        legalPerson: legalPersonMock,
      },
    },
  } as unknown as CheckoutStoreProps)
}

describe('useStep hook', () => {
  beforeEach(() => {
    act(() => {
      useCheckoutStore.setState({ state: initialCheckoutStoreState })
    })
  })

  it('should return legal person form handlers', () => {
    mockUseCheckoutStore(legalPersonMock)

    const { result } = renderHook(() => useLegalPesonForm(onSubmitMock))

    expect(result.current.handleInputChange).toBeInstanceOf(Function)
    expect(result.current.handleSubmit).toBeInstanceOf(Function)
    expect(result.current.isSubmitting).toBe(false)
  })

  it('should change form fields', () => {
    mockUseCheckoutStore(legalPersonMock)

    const { result } = renderHook(() => useLegalPesonForm(onSubmitMock))

    const fieldValue = 'field value mock'
    const fieldName = 'cnpj'

    act(() => {
      result.current.handleInputChange(changeHandlerMock, fieldValue, fieldName)
    })

    expect(changeHandlerMock).toHaveBeenCalledWith(fieldValue)
    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'legal',
      fieldName,
      fieldValue
    )
  })
})
