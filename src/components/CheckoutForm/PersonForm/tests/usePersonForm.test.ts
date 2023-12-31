import { renderHook } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { Customer } from '@/@types/customer'
import { usePersonForm } from '@/components/CheckoutForm/PersonForm/usePersonForm'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { axiosApi } from '@/libs/axios'
import { initializeApi } from '@/services/api'
import { Resources } from '@/services/api/resources'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'
import { customerMock } from '@/__tests__/mocks/customerMock'
import { legalPersonMock } from '@/__tests__/mocks/legalPersonMock'
import { naturalPersonMock } from '@/__tests__/mocks/naturalPersonMock'

jest.mock('../../../../contexts/CustomerContext')

const setPersonFormDataMock = jest.fn()
const onSuccessMock = jest.fn()
const updateCustomerMock = jest.fn()
const fetchCustomerByEmailMock = jest.fn()
const setFormError = jest.fn()

const emailMock = 'existingCustomer@email.com'
const documentMock = 'document mock'

const server = setupServer()

function mockGetCustomerByEmail(hasCustomer: boolean) {
  http.get(
    `msw/${Resources.CUSTOMERS}?q=${emailMock}&includes=addresses`,
    () => {
      if (hasCustomer) return HttpResponse.json(false)
      else return HttpResponse.json(true)
    }
  )
}

function mockCheckCustomerDocument(hasCustomer: boolean) {
  http.get(`msw/${Resources.CUSTOMERS}?q=${documentMock}`, () => {
    if (hasCustomer) return HttpResponse.json(false)
    else return HttpResponse.json(true)
  })
}

function mockUseCustomerContext(customer: Customer | null) {
  jest.mocked(useCustomerContext).mockReturnValueOnce({
    customer,
    updateCustomer: updateCustomerMock,
    fetchCustomerByEmail: fetchCustomerByEmailMock,
    setSelectedAddressZipcode: jest.fn(),
  })
}

describe('usePersonForm hook', () => {
  beforeAll(() => initializeApi(axiosApi))

  beforeEach(() => {
    server.listen()

    useCheckoutStore.setState({
      actions: { setPersonFormData: setPersonFormDataMock },
      personFormData: {
        naturalPerson: {
          ...naturalPersonMock,
          email: emailMock,
          cpf: documentMock,
        },
        legalPerson: {
          ...legalPersonMock,
          email: emailMock,
          cnpj: documentMock,
        },
      },
    } as unknown as CheckoutStoreProps)
  })

  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('should set person form data using natural customer data if exists', () => {
    mockUseCustomerContext({ ...customerMock, type: 'f' })

    renderHook(() => usePersonForm(onSuccessMock))

    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'natural',
      'name',
      customerMock.name
    )
    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'natural',
      'email',
      customerMock.email
    )
    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'natural',
      'cpf',
      customerMock.cpf
    )
    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'natural',
      'phone',
      customerMock.phone?.full_number
    )
  })

  it('should not create natural customer that already exists', () => {
    mockUseCustomerContext(null)
    mockCheckCustomerDocument(true)

    const { result } = renderHook(() => usePersonForm(onSuccessMock))

    result.current.handleSubmit('natural', setFormError)
  })
})
