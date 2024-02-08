import { act, renderHook, screen } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { usePaymentForm } from '../usePaymentForm'

import { testApi } from '@/_tests_/configs/testApi'
import { customerMock } from '@/_tests_/mocks/customerMock'
import { paymentConfigsMock } from '@/_tests_/mocks/paymentConfigsMock'
import { storageMock } from '@/_tests_/mocks/storageMock'
import { CustomerContext } from '@/contexts/CustomerContext'
import { ReactQueryProvider } from '@/providers/components/ReactQueryProvider'
import { initializeHttpProvider } from '@/services/api/http'
import { AxiosHttpProvider } from '@/services/api/http/axios'
import { Resources } from '@/services/api/yampi/utils/resources'
import { initializeStorageProvider } from '@/services/storage'
import { initializeValidationProvider } from '@/services/validation'
import { zodValidationProvider } from '@/services/validation/zod/index.ts'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'

const setCheckoutAddressMock = jest.fn()
const updateCustomerMock = jest.fn()
const fetchCustomerByEmailMock = jest.fn()
const removeCustomerMock = jest.fn()
const setCustomerSelectedAddressZipcodeMock = jest.fn()

const server = setupServer(...testApi.DEFAULT_HANDLERS)

function mockGetPaymentConfigs() {
  const url = `${testApi.BASE_URL}/${Resources.CHECKOUT}/payments`

  const getPaymentConfigsSpy = jest.fn()

  server.use(
    http.get(url, () => {
      getPaymentConfigsSpy()
      return HttpResponse.json({ data: paymentConfigsMock })
    })
  )

  return getPaymentConfigsSpy
}

function renderUsePaymentFormHook() {
  return renderHook(usePaymentForm, {
    wrapper: ({ children }) => (
      <ReactQueryProvider>
        <CustomerContext.Provider
          value={{
            customer: {
              ...customerMock,
            },
            fetchCustomerByEmail: fetchCustomerByEmailMock,
            setSelectedAddressZipcode: setCustomerSelectedAddressZipcodeMock,
            updateCustomer: updateCustomerMock,
            removeCustomer: removeCustomerMock,
          }}
        >
          {children}
        </CustomerContext.Provider>
      </ReactQueryProvider>
    ),
  })
}

describe('usePayment hook', () => {
  beforeAll(() => {
    initializeHttpProvider(AxiosHttpProvider)
    initializeValidationProvider(zodValidationProvider)
    initializeStorageProvider(storageMock)
  })

  beforeEach(() => {
    server.listen({
      onUnhandledRequest: 'error',
    })

    act(() => {
      useCheckoutStore.setState({
        actions: { setAddress: setCheckoutAddressMock },
      } as unknown as CheckoutStoreProps)
    })
  })

  it("should only render the zipcode field when the customer's addresses were not found", () => {
    mockGetPaymentConfigs()
    renderUsePaymentFormHook()

    expect(screen.getByTestId('zipcode')).toBeTruthy()
    expect(screen.queryByTestId('street')).not.toBeTruthy()
    expect(screen.queryByTestId('number')).not.toBeTruthy()
    expect(screen.queryByTestId('neighborhood')).not.toBeTruthy()
    expect(screen.queryByTestId('complement')).not.toBeTruthy()
    expect(screen.queryByTestId('submit-button')).not.toBeTruthy()
  })
})
