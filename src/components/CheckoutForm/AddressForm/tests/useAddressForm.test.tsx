import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { useAddressForm } from '../useAddressForm'

import { apiConfig } from '@/_tests_/configs/apiConfig'
import { addressesMock } from '@/_tests_/mocks/addressesMock'
import { customerMock } from '@/_tests_/mocks/customerMock'
import { Address } from '@/@types/address'
import { CustomerContext } from '@/contexts/CustomerContext'
import { axiosApi } from '@/libs/axios'
import { mmkvStorage } from '@/libs/mmkv'
import { QueryClientProvider } from '@/providers/QueryClientProvider'
import { initializeApi } from '@/services/api'
import { Resources } from '@/services/api/resources'
import { initializeStorage } from '@/services/storage'
import { CUSTOMER_KEY } from '@/services/storage/keys'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'

const setCheckoutAddressMock = jest.fn()
const updateCustomerMock = jest.fn()
const fetchCustomerByEmailMock = jest.fn()
const setSelectedAddressZipcodeMock = jest.fn()

const server = setupServer(...apiConfig.DEFAULT_HANDLERS)

const apiAddressMockResponse = {
  uf: 'PT',
  city: 'Cidade dos Poetas Mortos',
  street: 'Rua dos bocós',
  neighborhood: 'Bairro de Deus',
  zip_code: '98745612',
}

async function renderUseAddressFormHook() {
  const { result } = await waitFor(() => {
    return renderHook(useAddressForm, {
      wrapper: ({ children }) => (
        <QueryClientProvider>
          <CustomerContext.Provider
            value={{
              customer: customerMock,
              fetchCustomerByEmail: fetchCustomerByEmailMock,
              setSelectedAddressZipcode: setSelectedAddressZipcodeMock,
              updateCustomer: updateCustomerMock,
            }}
          >
            {children}
          </CustomerContext.Provider>
        </QueryClientProvider>
      ),
    })
  })

  return result.current
}

function mockGetAddressByZipcode(zipcode: string) {
  const url = `${apiConfig.BASE_URL}/${zipcode}/json/`

  const getAddressByZipcodeSpy = jest.fn()

  server.use(
    http.get(url, () => {
      getAddressByZipcodeSpy()
      return HttpResponse.json(apiAddressMockResponse)
    })
  )

  return getAddressByZipcodeSpy
}

function mockGetAddressesByCustomerId(addresses: Address[]) {
  const url = `${apiConfig.BASE_URL}/${Resources.CUSTOMERS}/${customerMock.id}/${Resources.ADDRESSES}`

  const getGetAddressesByCustomerIdSpy = jest.fn()

  server.use(
    http.get(url, () => {
      getGetAddressesByCustomerIdSpy()
      return HttpResponse.json(addresses)
    })
  )

  return getGetAddressesByCustomerIdSpy
}

function mockUpdateAddress(addressId: number) {
  const url = `${apiConfig.BASE_URL}/${Resources.CUSTOMERS}/${customerMock.id}/${Resources.ADDRESSES}/${addressId}`

  const updateAddressSpy = jest.fn()

  server.use(
    http.get(url, () => {
      updateAddressSpy()
      return HttpResponse.json(true)
    })
  )

  return updateAddressSpy
}

function mockDeleteAddress(addressId: number) {
  const url = `${apiConfig.BASE_URL}/${Resources.CUSTOMERS}/${customerMock.id}/${Resources.ADDRESSES}/${addressId}`

  const deleteAddressSpy = jest.fn()

  server.use(
    http.get(url, () => {
      deleteAddressSpy()
      return HttpResponse.json(true)
    })
  )

  return deleteAddressSpy
}

describe('useAddressForm hook', () => {
  beforeAll(() => {
    initializeApi(axiosApi)
    initializeStorage(mmkvStorage)
  })

  beforeEach(() => {
    server.listen({
      onUnhandledRequest: 'error',
    })

    act(() => {
      useCheckoutStore.setState({
        actions: { setCheckoutAddress: setCheckoutAddressMock },
      } as unknown as CheckoutStoreProps)
    })
  })

  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should fetch customer addresses', async () => {
    const getAddressByZipcodeSpy = mockGetAddressesByCustomerId([])

    await renderUseAddressFormHook()

    expect(getAddressByZipcodeSpy).toHaveBeenCalled()
  })

  it('should set address form using selected customer address', async () => {
    mockGetAddressesByCustomerId(customerMock.addresses.data)
    mmkvStorage.set(CUSTOMER_KEY.selectedAddressZipcode, '')

    const { addressFormData } = await renderUseAddressFormHook()

    const selectedAddress = {
      city: customerMock.addresses.data[0].city,
      street: customerMock.addresses.data[0].street,
      zipcode: customerMock.addresses.data[0].zip_code,
      uf: customerMock.addresses.data[0].uf,
      neighborhood: customerMock.addresses.data[0].neighborhood,
      complement: customerMock.addresses.data[0].complement,
      number: customerMock.addresses.data[0].number,
      receiver: customerMock.name,
    }

    expect(addressFormData).toEqual(expect.objectContaining(selectedAddress))
    expect(setCheckoutAddressMock).toHaveBeenCalledWith(
      expect.objectContaining({
        ...selectedAddress,
        zip_code: selectedAddress.zipcode,
      })
    )
  })

  it('should not fetch address by zipcode when zipcode is invalid', async () => {
    const invalidZipcode = 'bla'

    const getAddressByZipcodeSpy = mockGetAddressByZipcode(invalidZipcode)
    mockGetAddressesByCustomerId([])

    const { handleZipcodeChange, isZipcodeValid } =
      await renderUseAddressFormHook()

    handleZipcodeChange(invalidZipcode)

    expect(getAddressByZipcodeSpy).not.toHaveBeenCalled()
    expect(isZipcodeValid).toBe(false)
  })

  it('should fetch address by zipcode when zipcode is valid', async () => {
    const zipcode = '12231440'

    const getAddressByZipcodeSpy = mockGetAddressByZipcode(zipcode)
    mockGetAddressesByCustomerId([])

    const { handleZipcodeChange, addressFormData, isZipcodeValid } =
      await renderUseAddressFormHook()

    handleZipcodeChange(zipcode)

    const selectedAddress = {
      city: apiAddressMockResponse.city,
      street: apiAddressMockResponse.street,
      zipcode: apiAddressMockResponse.zip_code,
      uf: apiAddressMockResponse.uf,
      neighborhood: apiAddressMockResponse.neighborhood,
      number: '',
      receiver: customerMock.name,
    }

    expect(getAddressByZipcodeSpy).toHaveBeenCalled()
    expect(addressFormData).toEqual(expect.objectContaining(selectedAddress))
    expect(isZipcodeValid).toBe(true)
  })
})
