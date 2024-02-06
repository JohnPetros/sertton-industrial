import { act, screen, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { ShipmentServiceForm } from '..'

import { testApi } from '@/_tests_/configs/testApi'
import { render } from '@/_tests_/customs/customRender'
import { customerMock } from '@/_tests_/mocks/customerMock'
import { shipmentServicesMock } from '@/_tests_/mocks/shipmentServicesMock'
import { ShipmentService } from '@/@types/shipmentService'
import { CustomerContext } from '@/contexts/CustomerContext'
import { initializeHttpProvider } from '@/services/api/http'
import { AxiosProvider } from '@/services/api/http/axios'
import { Resources } from '@/services/api/yampi/utils/resources'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'
import { formatPrice } from '@/utils/helpers/formatPrice'

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

function renderShipmentServiceFormComponent() {
  const { debug } = render(
    <CustomerContext.Provider
      value={{
        customer: customerMock,
        removeCustomer: jest.fn(),
        fetchCustomerByEmail: fetchCustomerByEmailMock,
        setSelectedAddressZipcode: setCustomerSelectedAddressZipcodeMock,
        updateCustomer: updateCustomerMock,
      }}
    >
      <ShipmentServiceForm />
    </CustomerContext.Provider>
  )

  debug()
}

function mockGetShipmentServices(shipmentServices: ShipmentService[]) {
  const url = `${testApi.BASE_URL}/${Resources.SHIPMENT}/calculate`

  const getShipmentServicesSpy = jest.fn()

  server.use(
    http.post(url, () => {
      getShipmentServicesSpy()
      return HttpResponse.json(shipmentServices)
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

describe('ShimpmentServiceForm component', () => {
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

    mockCheckoutStore(checkoutShipmentServiceMock)
  })

  it('should render loading when there are not shipment services yet', () => {
    mockGetShipmentServices([])
    renderShipmentServiceFormComponent()

    expect(screen.getByText('calculando fretes...'))
  })

  it('should render title when thera are shipment services', async () => {
    mockGetShipmentServices(shipmentServicesMock)
    renderShipmentServiceFormComponent()

    await waitFor(() => {
      expect(screen.getByText('Escolha uma forma de entrega'))
    })
  })

  it.each(shipmentServicesMock)(
    'should render shipment service $name',
    async ({ name, price }) => {
      mockGetShipmentServices(shipmentServicesMock)
      renderShipmentServiceFormComponent()

      await waitFor(() => {
        expect(screen.getByText(name)).toBeTruthy()
        expect(screen.getByText(formatPrice(price))).toBeTruthy()
      })
    }
  )

  it('should not render continue checkout button when there is not a selected shipment service', async () => {
    mockGetShipmentServices([])
    mockCheckoutStore(null)
    renderShipmentServiceFormComponent()

    await waitFor(() => {
      const continueCheckoutButton = screen.queryByTestId(
        'continue-checkout-button'
      )
      expect(continueCheckoutButton).not.toBeTruthy()
    })
  })
})
