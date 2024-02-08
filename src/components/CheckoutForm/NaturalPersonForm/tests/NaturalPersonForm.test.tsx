import {
  act,
  fireEvent,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'
import { naturalPersonMock } from '@/_tests_/mocks/naturalPersonMock'
import { NaturalPersonForm } from '@/components/CheckoutForm/NaturalPersonForm'
import { useMask } from '@/components/Form/Input/useMask'
import { initializeValidation } from '@/services/validation'
import { VALIDATION_ERRORS } from '@/services/validation/utils/validationErrors'
import { zodProvider } from '@/services/validation/zod/index.ts'
import {
  initialCheckoutStoreState,
  useCheckoutStore,
} from '@/stores/checkoutStore'

jest.mock('expo-router')

const onSubmitMock = jest.fn()

describe('Natural Person Form Component', () => {
  beforeAll(() => {
    initializeValidation(zodProvider)
  })

  beforeEach(() => {
    act(() => {
      useCheckoutStore.setState({ state: initialCheckoutStoreState })
    })
  })

  it('should render natural person form fields', () => {
    render(<NaturalPersonForm onSubmit={onSubmitMock} />)

    expect(screen.getByTestId('email')).toBeTruthy()
    expect(screen.getByTestId('cpf')).toBeTruthy()
    expect(screen.getByTestId('name')).toBeTruthy()
    expect(screen.getByTestId('phone')).toBeTruthy()
  })

  it('should render default checkout store values on natural person form ', () => {
    useCheckoutStore.setState({
      state: {
        ...initialCheckoutStoreState,
        personFormData: {
          legalPerson: initialCheckoutStoreState.personFormData.legalPerson,
          naturalPerson: naturalPersonMock,
        },
      },
    })

    render(<NaturalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cpfInput = screen.getByTestId('cpf')
    const nameInput = screen.getByTestId('name')
    const phoneInput = screen.getByTestId('phone')

    const {
      result: { current: cpfMask },
    } = renderHook(() => useMask('cpf'))
    const {
      result: { current: phoneMask },
    } = renderHook(() => useMask('phone'))

    expect(emailInput.props.value).toBe(naturalPersonMock.email)
    expect(nameInput.props.value).toBe(naturalPersonMock.name)
    expect(cpfInput.props.value).toBe(cpfMask(naturalPersonMock.cpf))
    expect(phoneInput.props.value).toBe(phoneMask(naturalPersonMock.phone))
  })

  it('should render form empty errors', async () => {
    render(<NaturalPersonForm onSubmit={onSubmitMock} />)

    act(() => {
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(screen.getAllByText(VALIDATION_ERRORS.required)).toHaveLength(4)
    })
  })

  it('should render email regex error', async () => {
    render(<NaturalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cpfInput = screen.getByTestId('cpf')
    const nameInput = screen.getByTestId('name')
    const phoneInput = screen.getByTestId('phone')

    act(() => {
      fireEvent.changeText(emailInput, 'error email')
      fireEvent.changeText(cpfInput, naturalPersonMock.cpf)
      fireEvent.changeText(nameInput, naturalPersonMock.name)
      fireEvent.changeText(phoneInput, naturalPersonMock.phone)
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.email.regex))
    })
  })

  it('should render cpf length error', async () => {
    render(<NaturalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cpfInput = screen.getByTestId('cpf')
    const nameInput = screen.getByTestId('name')
    const phoneInput = screen.getByTestId('phone')

    act(() => {
      fireEvent.changeText(emailInput, naturalPersonMock.email)
      fireEvent.changeText(cpfInput, '42')
      fireEvent.changeText(nameInput, naturalPersonMock.name)
      fireEvent.changeText(phoneInput, naturalPersonMock.phone)
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.cpf.length))
    })
  })

  it('should render phone length error', async () => {
    render(<NaturalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cpfInput = screen.getByTestId('cpf')
    const nameInput = screen.getByTestId('name')
    const phoneInput = screen.getByTestId('phone')

    act(() => {
      fireEvent.changeText(emailInput, naturalPersonMock.email)
      fireEvent.changeText(cpfInput, naturalPersonMock.cpf)
      fireEvent.changeText(nameInput, naturalPersonMock.name)
      fireEvent.changeText(phoneInput, '42')
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.phone.length))
    })
  })

  it('should submit', async () => {
    render(<NaturalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cpfInput = screen.getByTestId('cpf')
    const nameInput = screen.getByTestId('name')
    const phoneInput = screen.getByTestId('phone')

    act(() => {
      fireEvent.changeText(emailInput, naturalPersonMock.email)
      fireEvent.changeText(cpfInput, naturalPersonMock.cpf)
      fireEvent.changeText(nameInput, naturalPersonMock.name)
      fireEvent.changeText(phoneInput, naturalPersonMock.phone)
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(onSubmitMock.mock.calls[0][0]).toBe('natural')
      expect(onSubmitMock.mock.calls[0][1]).toBeInstanceOf(Function)
    })
  })
})
