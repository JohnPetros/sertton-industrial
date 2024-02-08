import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { creditCardApiErrors, useCreditCardForm } from '../useCreditCardForm'

import { testApi } from '@/_tests_/configs/testApi'
import { testEnvVars } from '@/_tests_/configs/testEnvVars'
import { creditCardMock } from '@/_tests_/mocks/creditCardMock'
import { initializeHttpProvider } from '@/services/api/http'
import { AxiosHttpProvider } from '@/services/api/http/axios'
import { initializeValidationProvider } from '@/services/validation'
import { zodValidationProvider } from '@/services/validation/zod/index.ts'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'

const onPayMock = jest.fn()
const setCreditCardMock = jest.fn()
const creditCardTokenMock = '6c605d99-fc24-4890-ba29-0aa80431cd94'

const server = setupServer(...testApi.DEFAULT_HANDLERS)

function renderCreditCardFormHook() {
  return renderHook(() => useCreditCardForm(onPayMock))
}

function mockTokenizeCreditCard(errorMessage = '') {
  const url = `${testApi.BASE_URL}/tokens?appId=${testEnvVars.PAGARME_PUBLIC_KEY}`

  const tokenizeCreditCardSpy = jest.fn()

  server.use(
    http.post(url, () => {
      tokenizeCreditCardSpy()

      return errorMessage
        ? HttpResponse.json({ id: '', errors: errorMessage }, { status: 500 })
        : HttpResponse.json({ id: creditCardTokenMock })
    })
  )

  return tokenizeCreditCardSpy
}

describe('useCreditCardForm hook', () => {
  beforeAll(() => {
    initializeHttpProvider(AxiosHttpProvider)
    initializeValidationProvider(zodValidationProvider)

    server.listen({
      onUnhandledRequest: 'error',
    })
  })

  beforeEach(() => {
    act(() => {
      useCheckoutStore.setState({
        actions: {
          setCreditCard: setCreditCardMock,
        },
      } as unknown as CheckoutStoreProps)
    })
  })

  it('should set checkout credit card', () => {
    const { result } = renderCreditCardFormHook()

    const cpfMock = '123456789369'

    act(() => {
      result.current.handleInputChange('cpf', cpfMock)
    })

    expect(setCreditCardMock).toHaveBeenCalledWith('cpf', cpfMock)
  })

  it('should call onPay function after tokenize credit card', async () => {
    const tokenizeCreditCardSpy = mockTokenizeCreditCard()

    const { result } = renderCreditCardFormHook()

    await result.current.handleFormSubmit(creditCardMock)

    expect(tokenizeCreditCardSpy).toHaveBeenCalled()
    expect(onPayMock).toHaveBeenCalledWith('credit-card', creditCardTokenMock)
  })

  it('should set form errors based on the credit card api error message', async () => {
    const tokenizeCreditCardSpy = mockTokenizeCreditCard(
      'request.card.holder_name;request.card.number;request.card.cvv;request.card.exp_month'
    )

    const { result } = renderCreditCardFormHook()

    await result.current.handleFormSubmit(creditCardMock)

    await waitFor(() => {
      expect(tokenizeCreditCardSpy).toHaveBeenCalled()

      expect(result.current.errors).toEqual({
        name: {
          ref: undefined,
          message: creditCardApiErrors.name,
        },
        number: {
          ref: undefined,
          message: creditCardApiErrors.number,
        },
        securityCode: {
          ref: undefined,
          message: creditCardApiErrors.securityCode,
        },
        expirationDate: {
          ref: undefined,
          message: creditCardApiErrors.expirationDate,
        },
      })
    })
  })
})
