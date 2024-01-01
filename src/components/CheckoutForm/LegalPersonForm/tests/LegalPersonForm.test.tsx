import {
  act,
  fireEvent,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'
import { legalPersonMock } from '@/_tests_/mocks/legalPersonMock'
import { LegalPersonForm } from '@/components/CheckoutForm/LegalPersonForm'
import { useMask } from '@/components/Form/Input/useMask'
import {
  initialCheckoutStoreState,
  useCheckoutStore,
} from '@/stores/checkoutStore'
import { VALIDATION_ERRORS } from '@/utils/constants/validationErrors'

jest.mock('expo-router')

const onSubmitMock = jest.fn()

describe('Legal Person Form Component', () => {
  beforeEach(() => {
    act(() => {
      useCheckoutStore.setState({ state: initialCheckoutStoreState })
    })
  })

  it('should render legal person form fields', () => {
    render(<LegalPersonForm onSubmit={onSubmitMock} />)

    expect(screen.getByTestId('email')).toBeTruthy()
    expect(screen.getByTestId('cnpj')).toBeTruthy()
    expect(screen.getByTestId('razaoSocial')).toBeTruthy()
    expect(screen.getByTestId('phone')).toBeTruthy()
  })

  it('should render default checkout store values on legal person form ', () => {
    useCheckoutStore.setState({
      state: {
        ...initialCheckoutStoreState,
        personFormData: {
          naturalPerson: initialCheckoutStoreState.personFormData.naturalPerson,
          legalPerson: legalPersonMock,
        },
      },
    })

    render(<LegalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cnpjInput = screen.getByTestId('cnpj')
    const razaoSocialInput = screen.getByTestId('razaoSocial')
    const phoneInput = screen.getByTestId('phone')

    const {
      result: { current: cnpjMask },
    } = renderHook(() => useMask('cnpj'))
    const {
      result: { current: phoneMask },
    } = renderHook(() => useMask('phone'))

    expect(emailInput.props.value).toBe(legalPersonMock.email)
    expect(razaoSocialInput.props.value).toBe(legalPersonMock.razaoSocial)
    expect(cnpjInput.props.value).toBe(cnpjMask(legalPersonMock.cnpj))
    expect(phoneInput.props.value).toBe(phoneMask(legalPersonMock.phone))
  })

  it('should render form empty errors', async () => {
    render(<LegalPersonForm onSubmit={onSubmitMock} />)

    act(() => {
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(screen.getAllByText(VALIDATION_ERRORS.required)).toHaveLength(4)
    })
  })

  it('should render email regex error', async () => {
    render(<LegalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cnpjInput = screen.getByTestId('cnpj')
    const razaoSocialInput = screen.getByTestId('razaoSocial')
    const phoneInput = screen.getByTestId('phone')

    act(() => {
      fireEvent.changeText(emailInput, 'error email')
      fireEvent.changeText(cnpjInput, legalPersonMock.cnpj)
      fireEvent.changeText(razaoSocialInput, legalPersonMock.razaoSocial)
      fireEvent.changeText(phoneInput, legalPersonMock.phone)
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.email.regex))
    })
  })

  it('should render cnpj length error', async () => {
    render(<LegalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cnpjInput = screen.getByTestId('cnpj')
    const razaoSocialInput = screen.getByTestId('razaoSocial')
    const phoneInput = screen.getByTestId('phone')

    act(() => {
      fireEvent.changeText(emailInput, legalPersonMock.email)
      fireEvent.changeText(cnpjInput, '42')
      fireEvent.changeText(razaoSocialInput, legalPersonMock.razaoSocial)
      fireEvent.changeText(phoneInput, legalPersonMock.phone)
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.cnpj.length))
    })
  })

  it('should render phone length error', async () => {
    render(<LegalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cnpjInput = screen.getByTestId('cnpj')
    const razaoSocialInput = screen.getByTestId('razaoSocial')
    const phoneInput = screen.getByTestId('phone')

    act(() => {
      fireEvent.changeText(emailInput, legalPersonMock.email)
      fireEvent.changeText(cnpjInput, legalPersonMock.cnpj)
      fireEvent.changeText(razaoSocialInput, legalPersonMock.razaoSocial)
      fireEvent.changeText(phoneInput, '42')
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(screen.getByText(VALIDATION_ERRORS.phone.length))
    })
  })

  it('should submit', async () => {
    render(<LegalPersonForm onSubmit={onSubmitMock} />)

    const emailInput = screen.getByTestId('email')
    const cnpjInput = screen.getByTestId('cnpj')
    const razaoSocialInput = screen.getByTestId('razaoSocial')
    const phoneInput = screen.getByTestId('phone')

    act(() => {
      fireEvent.changeText(emailInput, legalPersonMock.email)
      fireEvent.changeText(cnpjInput, legalPersonMock.cnpj)
      fireEvent.changeText(razaoSocialInput, legalPersonMock.razaoSocial)
      fireEvent.changeText(phoneInput, legalPersonMock.phone)
      fireEvent.press(screen.getByTestId('submit-button'))
    })

    await waitFor(() => {
      expect(onSubmitMock.mock.calls[0][0]).toBe('legal')
      expect(onSubmitMock.mock.calls[0][1]).toBeInstanceOf(Function)
    })
  })
})
