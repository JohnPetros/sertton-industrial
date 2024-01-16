import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { useAddressForm } from '../useAddressForm'

import { testApi } from '@/_tests_/configs/testApi'
import { addressesMock } from '@/_tests_/mocks/addressesMock'
import { apiAddressMockResponse } from '@/_tests_/mocks/apiAddressMockResponse'
import { customerMock } from '@/_tests_/mocks/customerMock'
import { storageMock } from '@/_tests_/mocks/storageMock'
import { Address } from '@/@types/address'
import { CustomerContext } from '@/contexts/CustomerContext'
import { QueryClientProvider } from '@/providers/components/QueryClientProvider'
import { initializeApiProvider } from '@/services/api'
import { axiosProvider } from '@/services/api/axios'
import { Resources } from '@/services/api/config/resources'
import { initializeStorageProvider } from '@/services/storage'
import { CUSTOMER_KEY } from '@/services/storage/config/keys'
import { initializeValidation } from '@/services/validation'
import { zodProvider } from '@/services/validation/zod/index.ts'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'

const setCheckoutAddressMock = jest.fn()
const updateCustomerMock = jest.fn()
const fetchCustomerByEmailMock = jest.fn()
const setCustomerSelectedAddressZipcodeMock = jest.fn()

const server = setupServer(...testApi.DEFAULT_HANDLERS)

const selectedAddres = addressesMock[0]

function renderUseAddressFormHook() {
  return renderHook(useAddressForm, {
    wrapper: ({ children }) => (
      <QueryClientProvider>
        <CustomerContext.Provider
          value={{
            customer: {
              ...customerMock,
              selectedAddressZipcode: selectedAddres.zip_code,
            },
            fetchCustomerByEmail: fetchCustomerByEmailMock,
            setSelectedAddressZipcode: setCustomerSelectedAddressZipcodeMock,
            updateCustomer: updateCustomerMock,
          }}
        >
          {children}
        </CustomerContext.Provider>
      </QueryClientProvider>
    ),
  })
}

function mockGetAddressByZipcode(zipcode: string) {
  const url = `${testApi.BASE_URL}/${zipcode}/json`

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
  const url = `${testApi.BASE_URL}/${Resources.CUSTOMERS}/${customerMock.id}/${Resources.ADDRESSES}`

  const getGetAddressesByCustomerIdSpy = jest.fn()

  server.use(
    http.get(url, () => {
      getGetAddressesByCustomerIdSpy()
      return HttpResponse.json({ data: addresses })
    })
  )

  return getGetAddressesByCustomerIdSpy
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

function mockUpdateAddress(addressId: number) {
  const url = `${testApi.BASE_URL}/${Resources.CUSTOMERS}/${customerMock.id}/${Resources.ADDRESSES}/${addressId}`

  const updateAddressSpy = jest.fn()

  server.use(
    http.put(url, () => {
      updateAddressSpy()
      return HttpResponse.json(true)
    })
  )

  return updateAddressSpy
}

function mockDeleteAddress(addressId: number) {
  const url = `${testApi.BASE_URL}/${Resources.CUSTOMERS}/${customerMock.id}/${Resources.ADDRESSES}/${addressId}`

  const deleteAddressSpy = jest.fn()

  server.use(
    http.delete(url, () => {
      deleteAddressSpy()
      return HttpResponse.json(true)
    })
  )

  return deleteAddressSpy
}

describe('useAddressForm hook', () => {
  beforeAll(() => {
    initializeApiProvider(axiosProvider)
    initializeValidation(zodProvider)
    initializeStorageProvider(storageMock)
  })

  beforeEach(() => {
    setCheckoutAddressMock.mockClear()
    updateCustomerMock.mockClear()
    fetchCustomerByEmailMock.mockClear()
    setCustomerSelectedAddressZipcodeMock.mockClear()

    server.listen({
      onUnhandledRequest: 'error',
    })

    act(() => {
      useCheckoutStore.setState({
        actions: { setAddress: setCheckoutAddressMock },
      } as unknown as CheckoutStoreProps)
    })

    storageMock.clear()
  })

  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should fetch customer addresses', async () => {
    const getAddressesByCustomerId = mockGetAddressesByCustomerId([])

    renderUseAddressFormHook()

    await waitFor(() => {
      expect(getAddressesByCustomerId).toHaveBeenCalled()
    })
  })

  it('should set address form using selected customer address', async () => {
    const getAddressByCustomerIdSpy = mockGetAddressesByCustomerId(
      customerMock.addresses.data
    )

    const { result } = renderUseAddressFormHook()

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

    await waitFor(() => {
      expect(getAddressByCustomerIdSpy).toHaveBeenCalled()
      expect(result.current.addressFormData).toEqual(
        expect.objectContaining(selectedAddress)
      )
      expect(setCheckoutAddressMock).toHaveBeenCalledWith(
        expect.objectContaining({
          ...selectedAddress,
          zip_code: selectedAddress.zipcode,
        })
      )
      expect(result.current.isAddressRadioGroupVisible).toBe(true)
    })
  })

  it('should use storaged selected address zipcode when it exists', async () => {
    const selectedAddressZipcode = customerMock.addresses.data[0].zip_code

    storageMock.set(CUSTOMER_KEY.selectedAddressZipcode, selectedAddressZipcode)

    mockGetAddressesByCustomerId(customerMock.addresses.data)

    const { result } = renderUseAddressFormHook()

    await waitFor(() => {
      expect(setCustomerSelectedAddressZipcodeMock).toHaveBeenCalledWith(
        selectedAddressZipcode
      )
      expect(setCheckoutAddressMock).toHaveBeenCalledWith(
        expect.objectContaining({ zipcode: selectedAddressZipcode })
      )
      expect(result.current.addressFormData?.zipcode).toBe(
        selectedAddressZipcode
      )
    })
  })

  it('should not fetch address by zipcode when zipcode is invalid', async () => {
    const invalidZipcode = 'bla'

    const getAddressByZipcodeSpy = mockGetAddressByZipcode(invalidZipcode)
    mockGetAddressesByCustomerId([])
    mockUpdateAddress(customerMock.addresses.data[0].id)
    mockDeleteAddress(customerMock.addresses.data[0].id)

    const { result } = renderUseAddressFormHook()

    await act(
      async () => await result.current.handleZipcodeChange(invalidZipcode)
    )

    expect(getAddressByZipcodeSpy).not.toHaveBeenCalled()
    expect(result.current.isZipcodeValid).toBe(false)
  })

  it('should fetch address by zipcode when zipcode is valid', async () => {
    const getAddressByZipcodeSpy = mockGetAddressByZipcode(
      apiAddressMockResponse.cep
    )

    mockGetAddressesByCustomerId([])

    const { result } = renderUseAddressFormHook()

    await act(
      async () =>
        await result.current.handleZipcodeChange(apiAddressMockResponse.cep)
    )
    const selectedAddress = {
      city: apiAddressMockResponse.localidade,
      street: apiAddressMockResponse.logradouro,
      zipcode: apiAddressMockResponse.cep,
      uf: apiAddressMockResponse.uf,
      neighborhood: apiAddressMockResponse.bairro,
      number: '',
      receiver: customerMock.name,
    }

    expect(result.current.addressFormData).toEqual(
      expect.objectContaining(selectedAddress)
    )
    expect(getAddressByZipcodeSpy).toHaveBeenCalled()
    expect(result.current.isZipcodeValid).toBe(true)
  })

  it('should add new address when the submitted address is not associated to the customer on submit', async () => {
    const addAddressSpy = mockAddAddress()
    const updateAddressSpy = mockUpdateAddress(addressesMock[0].id)
    const getAddressByCustomerIdSpy = mockGetAddressesByCustomerId([])

    const { result } = renderUseAddressFormHook()

    await waitFor(() => {
      expect(getAddressByCustomerIdSpy).toHaveBeenCalled()
    })

    await act(async () => {
      await result.current.handleFormSubmit({
        city: addressesMock[0].city,
        uf: addressesMock[0].uf,
        complement: addressesMock[0].complement,
        number: addressesMock[0].number,
        neighborhood: addressesMock[0].neighborhood,
        street: addressesMock[0].street,
        zipcode: addressesMock[0].zip_code,
        receiver: customerMock.name ?? '',
      })
    })

    await waitFor(() => {
      expect(addAddressSpy).toHaveBeenCalled()
      expect(updateAddressSpy).not.toHaveBeenCalled()
      expect(setCustomerSelectedAddressZipcodeMock).toHaveBeenCalledWith(
        addressesMock[0].zip_code
      )
      expect(result.current.isAddressRadioGroupVisible).toBe(true)
    })
  })

  it('should update address when the submitted address is already associated to the customer on submit', async () => {
    const updateAddressSpy = mockUpdateAddress(addressesMock[0].id)
    const getAddressByCustomerIdSpy =
      mockGetAddressesByCustomerId(addressesMock)

    const { result } = renderUseAddressFormHook()

    await waitFor(() => {
      expect(getAddressByCustomerIdSpy).toHaveBeenCalled()
    })

    await act(async () => {
      await result.current.handleFormSubmit({
        city: addressesMock[0].city,
        uf: addressesMock[0].uf,
        complement: addressesMock[0].complement,
        number: addressesMock[0].number,
        neighborhood: addressesMock[0].neighborhood,
        street: addressesMock[0].street,
        zipcode: addressesMock[0].zip_code,
        receiver: customerMock.name ?? '',
      })
    })

    expect(updateAddressSpy).toHaveBeenCalled()

    expect(setCustomerSelectedAddressZipcodeMock).toHaveBeenCalledWith(
      addressesMock[0].zip_code
    )
    expect(setCheckoutAddressMock).toHaveBeenCalled()
    expect(result.current.isAddressRadioGroupVisible).toBe(true)
  })

  it('should set address form to the address data to be edited', async () => {
    const getAddressesByCustomerId = mockGetAddressesByCustomerId(addressesMock)

    const addressToBeEdited = addressesMock[0]

    const { result } = renderUseAddressFormHook()

    await waitFor(() => {
      act(() => result.current.handleEditAddress(addressToBeEdited.zip_code))
    })

    await waitFor(async () => {
      expect(getAddressesByCustomerId).toHaveBeenCalledTimes(1)

      expect(result.current.addressFormData).toEqual(
        expect.objectContaining({
          city: addressToBeEdited.city,
          street: addressToBeEdited.street,
          uf: addressToBeEdited.uf,
          neighborhood: addressToBeEdited.neighborhood,
          complement: addressToBeEdited.complement,
          number: addressToBeEdited.number,
          zipcode: addressToBeEdited.zip_code,
          receiver: customerMock.name,
        })
      )
    })
  })

  it('should delete address', async () => {
    const addressToBeDeleted = addressesMock[0]

    const getAddressByCustomerIdSpy =
      mockGetAddressesByCustomerId(addressesMock)
    const deleteAddressSpy = mockDeleteAddress(addressToBeDeleted.id)

    const { result } = renderUseAddressFormHook()

    await waitFor(() => {
      expect(getAddressByCustomerIdSpy).toHaveBeenCalled()
    })

    await act(async () => {
      result.current.handleDeleteAddress(addressToBeDeleted.zip_code)
    })

    await waitFor(async () => {
      expect(deleteAddressSpy).toHaveBeenCalled()
    })
  })

  it('should set customer selected address zipcode to their first saved address when the address to be deleted is selected', async () => {
    const getAddressByCustomerIdSpy =
      mockGetAddressesByCustomerId(addressesMock)

    mockDeleteAddress(selectedAddres.id)

    const { result } = renderUseAddressFormHook()

    await waitFor(() => {
      expect(getAddressByCustomerIdSpy).toHaveBeenCalled()
    })

    await act(async () =>
      result.current.handleDeleteAddress(selectedAddres.zip_code)
    )

    await waitFor(async () => {
      expect(setCustomerSelectedAddressZipcodeMock).toHaveBeenCalledWith(
        addressesMock[0].zip_code
      )
      expect(setCheckoutAddressMock).toHaveBeenCalledWith(addressesMock[0])
    })
  })

  it('should show registered addresses when show addresses button is pressed', async () => {
    mockGetAddressesByCustomerId(addressesMock)
    const { result } = renderUseAddressFormHook()

    act(() => result.current.handleShowAddressesButton())

    await waitFor(async () => {
      expect(result.current.isAddressRadioGroupVisible).toBe(true)
    })
  })

  it('should invalidate zipcode and hide registered addresses when add address button is pressed', async () => {
    mockGetAddressesByCustomerId(addressesMock)
    const { result } = renderUseAddressFormHook()

    act(() => result.current.handleAddAddressButton())

    await waitFor(async () => {
      expect(result.current.isAddressRadioGroupVisible).toBe(false)
      expect(result.current.isZipcodeValid).toBe(false)
    })
  })

  it('should set checkout address on change selected address', async () => {
    const getAddressesByCustomerIdSpy =
      mockGetAddressesByCustomerId(addressesMock)
    const { result } = renderUseAddressFormHook()

    const selectedAddress = addressesMock[0]

    await waitFor(() => {
      expect(getAddressesByCustomerIdSpy).toHaveBeenCalled()
    })

    act(() =>
      result.current.handleSelectedAddressChange(selectedAddress.zip_code)
    )

    await waitFor(async () => {
      expect(setCustomerSelectedAddressZipcodeMock).toHaveBeenCalledWith(
        selectedAddress.zip_code
      )
      expect(setCheckoutAddressMock).toHaveBeenCalledWith(selectedAddress)
    })
  })
})
