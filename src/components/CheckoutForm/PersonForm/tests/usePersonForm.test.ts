import { act, renderHook, waitFor } from '@testing-library/react-native'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

import { testApi } from '@/_tests_/configs/testApi'
import { customerMock } from '@/_tests_/mocks/customerMock'
import { legalPersonMock } from '@/_tests_/mocks/legalPersonMock'
import { naturalPersonMock } from '@/_tests_/mocks/naturalPersonMock'
import { Customer } from '@/@types/customer'
import { usePersonForm } from '@/components/CheckoutForm/PersonForm/usePersonForm'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { initializeApiProvider } from '@/services/api'
import { axiosProvider } from '@/services/api/axios'
import { Resources } from '@/services/api/config/resources'
import { VALIDATION_ERRORS } from '@/services/validation/config/validationErrors'
import { CheckoutStoreProps, useCheckoutStore } from '@/stores/checkoutStore'

jest.mock('../../../../contexts/CustomerContext')

const setPersonFormDataMock = jest.fn()
const onSuccessMock = jest.fn()
const updateCustomerMock = jest.fn()
const fetchCustomerByEmailMock = jest.fn()
const setFormErrorMock = jest.fn()

const emailMock = 'existingCustomer@email.com'
const documentMock = 'document-mock'

const server = setupServer(...testApi.DEFAULT_HANDLERS)
const url = `${testApi.BASE_URL}/${Resources.CUSTOMERS}`

function mockUseCustomerContext(customer: Customer | null) {
  jest.mocked(useCustomerContext).mockReturnValueOnce({
    customer,
    updateCustomer: updateCustomerMock,
    fetchCustomerByEmail: fetchCustomerByEmailMock,
    setSelectedAddressZipcode: jest.fn(),
  })
}

function mockGetCustomerApi(hasEmailInUse: boolean, hasDocumentInUse: boolean) {
  server.use(
    http.get(url, ({ request }) => {
      const query = new URL(request.url).searchParams.get('q')

      if (query === emailMock) {
        return HttpResponse.json({ data: [hasEmailInUse] })
      } else if (query === documentMock) {
        return HttpResponse.json({ data: [hasDocumentInUse] })
      }
    })
  )
}

async function expectCustomer(customer: Customer | null) {
  const { naturalPerson, legalPerson } =
    useCheckoutStore.getState().state.personFormData

  expect(customer).not.toBe(null)

  if (customer?.type === 'f') {
    await waitFor(() => {
      expect(customer).toEqual(
        expect.objectContaining({
          type: 'f',
          active: true,
          name: naturalPerson.name,
          email: naturalPerson.email,
          cpf: naturalPerson.cpf,
          homephone: naturalPerson.phone,
        })
      )
    })
  } else if (customer?.type === 'j') {
    await waitFor(() => {
      expect(customer).toEqual(
        expect.objectContaining({
          type: 'f',
          active: true,
          razaoSocial: legalPerson.razaoSocial,
          email: legalPerson.email,
          cnpj: legalPerson.cnpj,
          homephone: legalPerson.phone,
        })
      )
    })
  }
}

describe('usePersonForm hook', () => {
  beforeAll(() => initializeApiProvider(axiosProvider))

  beforeEach(() => {
    server.listen({
      onUnhandledRequest: 'error',
    })

    act(() => {
      useCheckoutStore.setState({
        actions: { setPersonFormData: setPersonFormDataMock },
        state: {
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
        },
      } as unknown as CheckoutStoreProps)
    })
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

  it('should set person form data using legal customer data if exists', () => {
    mockUseCustomerContext({ ...customerMock, type: 'j' })

    renderHook(() => usePersonForm(onSuccessMock))

    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'legal',
      'email',
      customerMock.email
    )
    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'legal',
      'razaoSocial',
      customerMock.razao_social
    )
    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'legal',
      'cnpj',
      customerMock.cnpj
    )
    expect(setPersonFormDataMock).toHaveBeenCalledWith(
      'legal',
      'phone',
      customerMock.phone?.full_number
    )
  })

  it('should not create natural customer that has a email that is already exists', async () => {
    mockUseCustomerContext(null)

    mockGetCustomerApi(true, false)

    const { result } = renderHook(() => usePersonForm(onSuccessMock))

    await waitFor(() => {
      result.current.handleSubmit('natural', setFormErrorMock)
    })

    expect(setFormErrorMock).toHaveBeenCalledWith(
      'email',
      VALIDATION_ERRORS.email.inUse
    )
  })

  it('should not create legal customer that has a email that is already exists', async () => {
    mockUseCustomerContext(null)

    mockGetCustomerApi(true, false)

    const { result } = renderHook(() => usePersonForm(onSuccessMock))

    await waitFor(() => {
      result.current.handleSubmit('legal', setFormErrorMock)
    })

    expect(setFormErrorMock).toHaveBeenCalledWith(
      'email',
      VALIDATION_ERRORS.email.inUse
    )
  })

  it('should not create natural customer that has a cpf that is already in use', async () => {
    mockUseCustomerContext(null)

    mockGetCustomerApi(false, true)

    const { result } = renderHook(() => usePersonForm(onSuccessMock))

    await waitFor(() => {
      result.current.handleSubmit('natural', setFormErrorMock)
    })

    expect(setFormErrorMock).toHaveBeenCalledWith(
      'cpf',
      VALIDATION_ERRORS.cpf.inUse
    )
  })

  it('should not create legal customer that has a cnpj that is already in use', async () => {
    mockUseCustomerContext(null)

    mockGetCustomerApi(false, true)

    const { result } = renderHook(() => usePersonForm(onSuccessMock))

    await waitFor(() => {
      result.current.handleSubmit('legal', setFormErrorMock)
    })

    expect(setFormErrorMock).toHaveBeenCalledWith(
      'cpf',
      VALIDATION_ERRORS.cpf.inUse
    )
  })

  it('should update a customer that already exists', async () => {
    mockUseCustomerContext(customerMock)

    mockGetCustomerApi(false, false)

    const { result } = renderHook(() => usePersonForm(onSuccessMock))

    await waitFor(() => {
      result.current.handleSubmit('natural', setFormErrorMock)
    })

    expect(updateCustomerMock).toHaveBeenCalled()
    expect(onSuccessMock).toHaveBeenCalled()
  })

  it('should create natural customer that does not exist', async () => {
    mockUseCustomerContext(null)
    mockGetCustomerApi(false, false)

    let createdCustomer: Customer | null = null

    server.use(
      http.post(url, async ({ request }) => {
        createdCustomer = (await request.json()) as Customer
      })
    )

    const { result } = renderHook(() => usePersonForm(onSuccessMock))

    await waitFor(() => {
      result.current.handleSubmit('natural', setFormErrorMock)
    })

    expectCustomer(createdCustomer)
  })

  it('should fetch customer by email when a customer is created', async () => {
    mockUseCustomerContext(null)
    mockGetCustomerApi(false, false)

    server.use(http.post(url, () => HttpResponse.json(true)))

    const { result } = renderHook(() => usePersonForm(onSuccessMock))

    await waitFor(() => {
      result.current.handleSubmit('natural', setFormErrorMock)
    })

    await waitFor(() => {
      expect(fetchCustomerByEmailMock).toHaveBeenCalledWith(emailMock)
      expect(onSuccessMock).toHaveBeenCalled()
    })
  })
})
