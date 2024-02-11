import { renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import {
  parsePaymentConfigsToCreditCardTypes,
  useCreditCardTypes,
} from '../useCreditCardTypes'

import { testApi } from '@/_tests_/configs/testApi'
import { paymentConfigsMock } from '@/_tests_/mocks/paymentConfigsMock'
import { CacheProvider } from '@/providers/components/CacheProvider'
import { initializeHttpProvider } from '@/services/api/http'
import { AxiosHttpProvider } from '@/services/api/http/axios'
import { Resources } from '@/services/api/yampi/utils/resources'

const getPaymentConfigsSpy = jest.fn()

const server = setupServer(...testApi.DEFAULT_HANDLERS)

function renderCreditCardFormHook() {
  return renderHook(() => useCreditCardTypes(), {
    wrapper: ({ children }) => <CacheProvider>{children}</CacheProvider>,
  })
}

function mockGetPaymentConfigs() {
  const url = `${testApi.BASE_URL}/${Resources.CHECKOUT}/payments`

  server.use(
    http.get(url, () => {
      getPaymentConfigsSpy()
      return HttpResponse.json({ data: paymentConfigsMock })
    })
  )
}

describe('useCreditCardTypes hook', () => {
  beforeAll(() => {
    initializeHttpProvider(AxiosHttpProvider)

    server.listen({
      onUnhandledRequest: 'error',
    })
  })

  beforeEach(() => {
    mockGetPaymentConfigs()
  })

  it('should fetch payment configs', async () => {
    renderCreditCardFormHook()

    await waitFor(() => {
      expect(getPaymentConfigsSpy).toHaveBeenCalled()
    })
  })

  it('should return credit card types', async () => {
    const { result } = renderCreditCardFormHook()

    await waitFor(() => {
      console.log(result.current.creditCardTypes)

      expect(result.current.creditCardTypes).toEqual(
        parsePaymentConfigsToCreditCardTypes(paymentConfigsMock)
      )
    })
  })
})
