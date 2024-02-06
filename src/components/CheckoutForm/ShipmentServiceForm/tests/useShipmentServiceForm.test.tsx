import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { useShipmentServiceForm } from '../useShipmentServiceForm'

import { testApi } from '@/_tests_/configs/testApi'
import { customerMock } from '@/_tests_/mocks/customerMock'
import { shipmentServicesMock } from '@/_tests_/mocks/shipmentServicesMock'
import { ShipmentService } from '@/@types/shipmentService'
import { CustomerContext } from '@/contexts/CustomerContext'
import { QueryClientProvider } from '@/providers/components/QueryClientProvider'
import { initializeHttpProvider } from '@/services/api/http'
import { AxiosProvider } from '@/services/api/http/axios'
import { Resources } from '@/services/api/yampi/utils/resources'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'

const setStepMock = jest.fn()
const setShipmentServiceMock = jest.fn()
const setCustomerSelectedAddressZipcodeMock = jest.fn()
const fetchCustomerByEmailMock = jest.fn()
const updateCustomerMock = jest.fn()

jest.mock('../../../../hooks/useCart.ts', () => {
  return {
    useCart() {
      return {
        products: [],
        getSelectedSkus: () => [],
      }
    },
  }
})

const server = setupServer(...testApi.DEFAULT_HANDLERS)

const checkoutShipmentServiceMock = shipmentServicesMock[0]

function renderShipmentServiceFormHook() {
  return renderHook(useShipmentServiceForm, {
    wrapper: ({ children }) => (
      <QueryClientProvider>
        <CustomerContext.Provider
          value={{
            customer: {
              ...customerMock,
            },
            fetchCustomerByEmail: fetchCustomerByEmailMock,
            setSelectedAddressZipcode: setCustomerSelectedAddressZipcodeMock,
            removeCustomer: jest.fn(),
            updateCustomer: updateCustomerMock,
          }}
        >
          {children}
        </CustomerContext.Provider>
      </QueryClientProvider>
    ),
  })
}

function mockGetShipmentServices() {
  const url = `${testApi.BASE_URL}/${Resources.SHIPMENT}/calculate`

  const getShipmentServicesSpy = jest.fn()

  server.use(
    http.post(url, () => {
      getShipmentServicesSpy()
      return HttpResponse.json(shipmentServicesMock)
    })
  )

  return getShipmentServicesSpy
}

function mockCheckoutStore(shipmentService: ShipmentService | null) {
  act(() => {
    useCheckoutStore.setState({
      state: {
        shipmentService,
      },
      actions: {
        setShipmentService: setShipmentServiceMock,
        setStep: setStepMock,
      },
    } as unknown as CheckoutStoreProps)
  })
}

describe('useShipmentServiceForm hook', () => {
  beforeAll(() => {
    initializeHttpProvider(AxiosProvider)
  })

  beforeEach(() => {
    setStepMock.mockClear()
    setShipmentServiceMock.mockClear()
    updateCustomerMock.mockClear()
    fetchCustomerByEmailMock.mockClear()
    setCustomerSelectedAddressZipcodeMock.mockClear()

    server.listen({
      onUnhandledRequest: 'error',
    })
  })

  it('should fetch shipment services', async () => {
    const getShipmentServicesSpy = mockGetShipmentServices()
    mockCheckoutStore(checkoutShipmentServiceMock)

    const { result } = renderShipmentServiceFormHook()

    await waitFor(() => {
      expect(getShipmentServicesSpy).toHaveBeenCalled()

      expect(result.current.shipmentServices).toEqual(shipmentServicesMock)
    })
  })

  it('should return checkout shipment service if it exists', async () => {
    const getShipmentServicesSpy = mockGetShipmentServices()
    mockCheckoutStore(checkoutShipmentServiceMock)

    const { result } = renderShipmentServiceFormHook()

    await waitFor(() => {
      expect(getShipmentServicesSpy).toHaveBeenCalled()

      expect(result.current.selectedShipmentService).toEqual(
        checkoutShipmentServiceMock
      )
    })
  })

  it('should return selected shipment service as null if checkout shipment service is not set', async () => {
    const getShipmentServicesSpy = mockGetShipmentServices()
    mockCheckoutStore(null)

    const { result } = renderShipmentServiceFormHook()

    await waitFor(() => {
      expect(getShipmentServicesSpy).toHaveBeenCalled()

      expect(result.current.selectedShipmentService).toBe(null)
    })
  })

  it('should set checkout shipment service', async () => {
    mockGetShipmentServices()
    mockCheckoutStore(checkoutShipmentServiceMock)

    const { result } = renderShipmentServiceFormHook()

    const shipmentService = shipmentServicesMock[0]

    await waitFor(() => {
      act(() => {
        result.current.handleShipmentServiceChange(shipmentService.name)
      })

      expect(setShipmentServiceMock).toHaveBeenCalledWith(shipmentService)
    })

    await waitFor(() => {
      expect(result.current.selectedShipmentService).toEqual(shipmentService)
    })
  })

  it('should set step to 3 when checkout shipment service is not null', async () => {
    mockGetShipmentServices()
    mockCheckoutStore(checkoutShipmentServiceMock)

    const { result } = renderShipmentServiceFormHook()

    act(() => {
      result.current.handleContinueCheckout()
    })

    await waitFor(() => {
      expect(setStepMock).toHaveBeenCalledWith(3)
    })
  })
})
