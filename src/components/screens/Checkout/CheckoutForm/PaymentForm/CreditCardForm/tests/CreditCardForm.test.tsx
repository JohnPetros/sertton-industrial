import { act, fireEvent, screen, waitFor } from '@testing-library/react-native'

import { CreditCardForm } from '..'

import { render } from '@/_tests_/customs/customRender'
import { creditCardMock } from '@/_tests_/mocks/creditCardMock'
import { CreditCard } from '@/@types/creditCard'
import { useMask } from '@/components/shared/Input/useMask'
import { initializeHttpProvider } from '@/services/api/http'
import { AxiosHttpProvider } from '@/services/api/http/axios'
import { initializeValidationProvider } from '@/services/validation'
import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'
import { zodValidationProvider } from '@/services/validation/zod/index.ts'
import {
  CheckoutStoreProps,
  initialCheckoutStoreState,
  useCheckoutStore,
} from '@/stores/checkoutStore'

const onPayMock = jest.fn()
const setCreditCardMock = jest.fn()

function mockCheckoutStore(creditCard: CreditCard | null) {
  useCheckoutStore.setState({
    state: {
      ...initialCheckoutStoreState,
      creditCard: creditCard ?? {
        cpf: '',
        expirationDate: '',
        name: '',
        number: '',
        securityCode: '',
      },
    },
  })
}

describe('CreditCardTyps component', () => {
  beforeAll(() => {
    initializeHttpProvider(AxiosHttpProvider)
    initializeValidationProvider(zodValidationProvider)
  })

  beforeEach(() => {
    act(() => {
      useCheckoutStore.setState({
        actions: {
          setCreditCard: setCreditCardMock,
        },
      } as unknown as CheckoutStoreProps)
    })

    mockCheckoutStore(null)
  })

  it('should use checkout store credit card in the credit card form on first rendering', async () => {
    mockCheckoutStore(creditCardMock)

    render(<CreditCardForm onPay={onPayMock} />)

    const numberInput = screen.getByTestId('number')
    const expirationDateInput = screen.getByTestId('expirationDate')
    const securityCodeInput = screen.getByTestId('securityCode')
    const cpfInput = screen.getByTestId('cpf')

    const mask = useMask('credit-card-expiration-date')

    await waitFor(() => {
      expect(numberInput.props.value).toBe(creditCardMock.number)
      expect(expirationDateInput.props.value).toBe(
        mask(creditCardMock.expirationDate)
      )
      expect(securityCodeInput.props.value).toBe(creditCardMock.securityCode)
      expect(cpfInput.props.value).toBe(creditCardMock.cpf)
    })
  })

  it('should render credit card number field validation errors', async () => {
    render(<CreditCardForm onPay={onPayMock} />)

    const numberInput = screen.getByTestId('number')

    act(() => {
      fireEvent.changeText(numberInput, '1234')
    })

    fireEvent.press(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(
        screen.getByText(VALIDATION_ERRORS.creditCardNumber.length)
      ).toBeTruthy()
    })
  })

  it('should render credit expiration date field validation errors', async () => {
    render(<CreditCardForm onPay={onPayMock} />)

    const expirationDateInput = screen.getByTestId('expirationDate')

    act(() => {
      fireEvent.changeText(expirationDateInput, '42')
    })

    fireEvent.press(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(
        screen.getByText(VALIDATION_ERRORS.creditCardExpirationDate.length)
      ).toBeTruthy()
    })
  })

  it('should render credit security code field validation errors', async () => {
    const { debug } = render(<CreditCardForm onPay={onPayMock} />)

    const securityCodeInput = screen.getByTestId('securityCode')

    act(() => {
      fireEvent.changeText(securityCodeInput, '42')
    })

    fireEvent.press(screen.getByTestId('submit-button'))

    debug()

    await waitFor(() => {
      expect(
        screen.getByText(VALIDATION_ERRORS.creditCardSecurityCode.min)
      ).toBeTruthy()
    })
  })

  it('should render cardholder field validation errors', async () => {
    render(<CreditCardForm onPay={onPayMock} />)

    const cardholderInput = screen.getByTestId('name')

    act(() => {
      fireEvent.changeText(cardholderInput, 'foo')
    })

    fireEvent.press(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.fullname.regex)).toBeTruthy()
    })

    act(() => {
      fireEvent.changeText(cardholderInput, 'John Petros.')
    })

    fireEvent.press(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.fullname.regex)).toBeTruthy()
    })
  })

  it('should render cpf field validation errors', async () => {
    render(<CreditCardForm onPay={onPayMock} />)

    const cpfInput = screen.getByTestId('cpf')

    act(() => {
      fireEvent.changeText(cpfInput, '1234')
    })

    fireEvent.press(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.cpf.length)).toBeTruthy()
    })
  })
})
