import { View } from 'react-native'
import { act, fireEvent, screen, waitFor } from '@testing-library/react-native'
import { usePathname } from 'expo-router'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { AddressForm } from '..'

import { testApi } from '@/_tests_/configs/testApi'
import { render } from '@/_tests_/customs/customRender'
import { addressesMock } from '@/_tests_/mocks/addressesMock'
import { apiAddressMockResponse } from '@/_tests_/mocks/apiAddressMockResponse'
import { customerMock } from '@/_tests_/mocks/customerMock'
import { storageMock } from '@/_tests_/mocks/storageMock'
import { Address } from '@/@types/address'
import { useMask } from '@/components/Form/Input/useMask'
import { CustomerContext } from '@/contexts/CustomerContext'
import { initializeApiProvider } from '@/services/api'
import { axiosProvider } from '@/services/api/axios'
import { Resources } from '@/services/api/yampi/utils/resources'
import { initializeStorageProvider } from '@/services/storage'
import { initializeValidation } from '@/services/validation'
import { zodProvider } from '@/services/validation/zod/index.ts'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'
import { getOnlyNumbers } from '@/utils/helpers/getOnlyNumbers'

jest.mock('expo-router')

const Pencil = () => <View />
const Trash = () => <View />
const HouseLine = () => <View />
const SmileySad = () => <View />
const Icon = () => <View />
const ShipmentServiceForm = () => <View testID="shipment-service-form" />

jest.mock('phosphor-react-native', () => ({
  Pencil: () => {
    return <Pencil />
  },
  Trash: () => {
    return <Trash />
  },
  HouseLine: () => {
    return <HouseLine />
  },
  SmileySad: () => {
    return <SmileySad />
  },
  Icon: () => {
    return <Icon />
  },
}))

jest.mock('../../ShipmentServiceForm', () => ({
  ShipmentServiceForm: () => {
    return <ShipmentServiceForm />
  },
}))

const setCheckoutAddressMock = jest.fn()
const updateCustomerMock = jest.fn()
const fetchCustomerByEmailMock = jest.fn()
const setCustomerSelectedAddressZipcodeMock = jest.fn()

const server = setupServer(...testApi.DEFAULT_HANDLERS)

const validZipcode = getOnlyNumbers(addressesMock[0].zip_code)

function mockGetAddressesByCustomerId(addresses: Address[]) {
  const url = `${testApi.BASE_URL}/${Resources.CUSTOMERS}/${customerMock.id}/${Resources.ADDRESSES}`

  const getAddressesByCustomerIdSpy = jest.fn()

  server.use(
    http.get(url, () => {
      getAddressesByCustomerIdSpy()
      return HttpResponse.json({ data: addresses })
    })
  )

  return getAddressesByCustomerIdSpy
}

function mockGetAddressByZipcode() {
  const url = `${testApi.BASE_URL}/${validZipcode}/json`

  const getAddressByZipcodeSpy = jest.fn()

  server.use(
    http.get(url, () => {
      getAddressByZipcodeSpy()
      return HttpResponse.json(apiAddressMockResponse)
    })
  )

  return getAddressByZipcodeSpy
}

function mockAddAddress() {
  const url = `${testApi.BASE_URL}/${Resources.CUSTOMERS}/${customerMock.id}/${Resources.ADDRESSES}`

  const addAddressSpy = jest.fn()

  server.use(
    http.post(url, () => {
      addAddressSpy()
      return HttpResponse.json(true)
    })
  )

  return addAddressSpy
}

function renderAddressFormComponent() {
  const { debug } = render(
    <CustomerContext.Provider
      value={{
        customer: customerMock,
        fetchCustomerByEmail: fetchCustomerByEmailMock,
        setSelectedAddressZipcode: setCustomerSelectedAddressZipcodeMock,
        updateCustomer: updateCustomerMock,
      }}
    >
      <AddressForm />
    </CustomerContext.Provider>
  )

  debug()
}

describe('AddressForm component', () => {
  beforeAll(() => {
    initializeApiProvider(axiosProvider)
    initializeValidation(zodProvider)
    initializeStorageProvider(storageMock)
  })

  beforeEach(() => {
    server.listen({
      onUnhandledRequest: 'error',
    })

    mockGetAddressByZipcode()

    act(() => {
      useCheckoutStore.setState({
        actions: { setAddress: setCheckoutAddressMock },
      } as unknown as CheckoutStoreProps)
    })
  })

  it("should only render the zipcode field when the customer's addresses were not found", () => {
    mockGetAddressByZipcode()
    renderAddressFormComponent()

    expect(screen.getByTestId('zipcode')).toBeTruthy()
    expect(screen.queryByTestId('street')).not.toBeTruthy()
    expect(screen.queryByTestId('number')).not.toBeTruthy()
    expect(screen.queryByTestId('neighborhood')).not.toBeTruthy()
    expect(screen.queryByTestId('complement')).not.toBeTruthy()
    expect(screen.queryByTestId('submit-button')).not.toBeTruthy()
  })

  it('should try to fetch an address when the zipcode field is valid', async () => {
    const getAddressByZipcodeSpy = mockGetAddressByZipcode()
    renderAddressFormComponent()

    const zipcodeInput = screen.getByTestId('zipcode')

    fireEvent.changeText(zipcodeInput, validZipcode)

    await waitFor(() => {
      expect(getAddressByZipcodeSpy).toHaveBeenCalled()
    })
  })

  it('should render invalid zipcode error message when an address is not fetched', async () => {
    mockGetAddressByZipcode()
    renderAddressFormComponent()

    const zipcodeInput = screen.getByTestId('zipcode')

    const invalidZipcode = '12231440'

    fireEvent.changeText(zipcodeInput, invalidZipcode)

    await waitFor(() => {
      expect(screen.getByText(/Nenhum endereço encontrado para esse CEP/i))
    })
  })

  it('should render submit button and other address form fields when address is fetched', async () => {
    mockGetAddressByZipcode()
    mockGetAddressesByCustomerId([])
    renderAddressFormComponent()

    const zipcodeInput = screen.getByTestId('zipcode')

    act(() => {
      fireEvent.changeText(zipcodeInput, validZipcode)
    })

    await waitFor(() => {
      expect(screen.getByTestId('street')).toBeTruthy()
      expect(screen.getByTestId('number')).toBeTruthy()
      expect(screen.getByTestId('neighborhood')).toBeTruthy()
      expect(screen.getByTestId('complement')).toBeTruthy()
      expect(screen.getByTestId('submit-button')).toBeTruthy()
    })
  })

  it('should render the data of fetched address and customer name', async () => {
    mockGetAddressByZipcode()
    mockGetAddressesByCustomerId([])
    renderAddressFormComponent()

    const zipcodeInput = screen.getByTestId('zipcode')

    act(() => {
      fireEvent.changeText(zipcodeInput, validZipcode)
    })

    await waitFor(() => {
      const streetInput = screen.getByTestId('street')
      const numberInput = screen.getByTestId('number')
      const neighborhoodInput = screen.getByTestId('neighborhood')
      const receiverInput = screen.getByTestId('receiver')

      expect(streetInput.props.value).toBe(apiAddressMockResponse.logradouro)
      expect(numberInput.props.value).toBe('')
      expect(neighborhoodInput.props.value).toBe(apiAddressMockResponse.bairro)
      expect(receiverInput.props.value).toBe(customerMock.name)
    })
  })

  it("should remove zipcode field and then render customer's addresses when show addresses button is pressed", async () => {
    mockGetAddressesByCustomerId(addressesMock)

    renderAddressFormComponent()

    const zipcodeField = screen.getByTestId('zipcode')
    expect(zipcodeField).toBeTruthy()

    const showAddressesButton = screen.getByTestId('show-addresses-button')

    act(() => {
      fireEvent.press(showAddressesButton)
    })

    await waitFor(() => {
      const zipcodeField = screen.queryByTestId('zipcode')
      expect(zipcodeField).not.toBeTruthy()

      expect(screen.getByTestId(addressesMock[0].zip_code)).toBeTruthy()
    })
  })

  it('should render empty items message when the customer has no registered address', async () => {
    mockGetAddressesByCustomerId([])
    renderAddressFormComponent()

    const showAddressesButton = screen.getByTestId('show-addresses-button')
    act(() => {
      fireEvent.press(showAddressesButton)
    })

    await waitFor(() => {
      expect(screen.getByText(/Nenhum endereço cadastrado./i)).toBeTruthy()
    })
  })

  it("should show customer's addresses when a new address is successfully submitted", async () => {
    const addAddressSpy = mockAddAddress()
    mockGetAddressesByCustomerId([])
    renderAddressFormComponent()

    const zipcodeInput = screen.getByTestId('zipcode')

    act(() => {
      fireEvent.changeText(zipcodeInput, addressesMock[0].zip_code)
    })

    await waitFor(() => {
      const streetInput = screen.getByTestId('street')
      const numberInput = screen.getByTestId('number')
      const neighborhoodInput = screen.getByTestId('neighborhood')
      const complementInput = screen.getByTestId('complement')

      const submitButton = screen.getByTestId('submit-button')

      act(() => {
        fireEvent.changeText(streetInput, addressesMock[0].street)
        fireEvent.changeText(numberInput, addressesMock[0].number)
        fireEvent.changeText(neighborhoodInput, addressesMock[0].neighborhood)
        fireEvent.changeText(complementInput, addressesMock[0].complement)

        fireEvent.press(submitButton)
      })
    })

    await waitFor(() => {
      expect(addAddressSpy).toHaveBeenCalled()
      expect(screen.queryByTestId('zipcode')).not.toBeTruthy()
      expect(screen.queryByTestId('street')).not.toBeTruthy()
      expect(screen.queryByTestId('number')).not.toBeTruthy()
      expect(screen.queryByTestId('neighborhood')).not.toBeTruthy()
      expect(screen.queryByTestId('complement')).not.toBeTruthy()
    })
  })

  it('should remove all customer addresses and render zipcode field when add address button is pressed', async () => {
    mockGetAddressesByCustomerId(addressesMock)
    renderAddressFormComponent()

    await waitFor(() => {
      expect(screen.queryByTestId('zipcode')).not.toBeTruthy()
      expect(screen.getByTestId(addressesMock[0].zip_code)).toBeTruthy()

      const addAddressButton = screen.getByTestId('add-address-button')

      act(() => {
        fireEvent.press(addAddressButton)
      })
    })

    await waitFor(() => {
      expect(screen.queryByTestId('zipcode')).toBeTruthy()

      expect(screen.queryByTestId(addressesMock[0].zip_code)).not.toBeTruthy()
    })
  })

  it('should render the data of the address to be edited in the address form', async () => {
    mockGetAddressesByCustomerId(addressesMock)
    renderAddressFormComponent()

    const addressToBeEdited = addressesMock[0]

    await waitFor(() => {
      const editButton = screen.getByTestId(
        `edit-button-${addressToBeEdited.zip_code}`
      )

      act(() => {
        fireEvent.press(editButton)
      })
    })

    const mask = useMask('cep')

    await waitFor(() => {
      const zipcodeInput = screen.getByTestId('zipcode')
      const streetInput = screen.getByTestId('street')
      const numberInput = screen.getByTestId('number')
      const neighborhoodInput = screen.getByTestId('neighborhood')
      const receiverInput = screen.getByTestId('receiver')

      expect(zipcodeInput.props.value).toBe(mask(addressToBeEdited.zip_code))
      expect(streetInput.props.value).toBe(addressToBeEdited.street)
      expect(numberInput.props.value).toBe(addressToBeEdited.number)
      expect(neighborhoodInput.props.value).toBe(addressToBeEdited.neighborhood)
      expect(receiverInput.props.value).toBe(customerMock.name)
    })
  })

  it('should render shipment service form on show addresses on all non-profile screen', async () => {
    const usePathnameMock = jest.mocked(usePathname)

    usePathnameMock.mockReturnValueOnce('/checkout')

    mockGetAddressesByCustomerId(addressesMock)

    renderAddressFormComponent()

    await waitFor(() => {
      expect(screen.getByTestId('shipment-service-form')).toBeTruthy()
    })
  })

  it('should not render shipment service form on the profile screen', async () => {
    const usePathnameMock = jest.mocked(usePathname)

    usePathnameMock.mockReturnValueOnce('/profile')

    mockGetAddressesByCustomerId(addressesMock)

    renderAddressFormComponent()

    await waitFor(() => {
      expect(screen.queryByTestId('shipment-service-form')).not.toBeTruthy()
    })
  })
})
