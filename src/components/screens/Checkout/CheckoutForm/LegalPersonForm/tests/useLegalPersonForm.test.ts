import { act, renderHook } from '@testing-library/react-native'

import { useLegalPesonForm } from '../useLegalPersonForm'

import { naturalPersonMock } from '@/_tests_/mocks/naturalPersonMock'
import { initializeValidationProvider } from '@/services/validation'
import { NaturalPersonForm } from '@/services/validation/types/NaturalPersonForm'
import { zodValidationProvider } from '@/services/validation/zod/index.ts'
import {
  CheckoutStoreProps,
  initialCheckoutStoreState,
  useCheckoutStore,
} from '@/stores/checkoutStore'

const setStepMock = jest.fn()
const onSubmitMock = jest.fn()
const changeHandlerMock = jest.fn()
const setPersonFormDataMock = jest.fn()

function mockUseCheckoutStore(naturalPersonMock: NaturalPersonForm) {
  useCheckoutStore.setState({
    actions: { setStep: setStepMock, setPersonFormData: setPersonFormDataMock },
    state: {
      personFormData: {
        naturalPerson: naturalPersonMock,
      },
    },
  } as unknown as CheckoutStoreProps)
}

describe('useLegalPersonForm hook', () => {
  beforeAll(() => {
    initializeValidationProvider(zodValidationProvider)
  })

  beforeEach(() => {
    act(() => {
      useCheckoutStore.setState({ state: initialCheckoutStoreState })
    })
  })

  it('should return natural person form handlers', () => {
    mockUseCheckoutStore(naturalPersonMock)

    const { result } = renderHook(() => useLegalPesonForm(onSubmitMock))

    expect(result.current.handleInputChange).toBeInstanceOf(Function)
    expect(result.current.handleSubmit).toBeInstanceOf(Function)
    expect(result.current.isSubmitting).toBe(false)
  })

  it('should change form fields', () => {
    mockUseCheckoutStore(naturalPersonMock)

    const { result } = renderHook(() => useLegalPesonForm(onSubmitMock))

    const fieldValue = 'field value mock'
    const fieldName = 'cnpj'

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
