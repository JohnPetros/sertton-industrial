import { act, renderHook, waitFor } from '@testing-library/react-native'

import { MESSAGES } from '../constants/messages'
import { useLeadsCapture } from '../useLeadsCapture'

import { useApiMock } from '@/_tests_/mocks/apiMock'
import { useToastMock } from '@/_tests_/mocks/useToastMock'
import { ToastWrapper } from '@/_tests_/wrappers/ToastWrapper'
import { initializeProviders } from '@/providers/index'

jest.mock('@/services/api')

describe('useLeadsCapture hook', () => {
  beforeAll(() => {
    initializeProviders()
  })

  it('should change email value', () => {
    const { result } = renderHook(useLeadsCapture, { wrapper: ToastWrapper })

    const email = 'email mock'

    act(() => {
      result.current.handleEmailChange(email)
    })

    expect(result.current.email).toBe(email)
    expect(result.current.error).toBe('')
  })

  it('should return error on submit if the provided email is not valid', () => {
    const { result } = renderHook(useLeadsCapture, { wrapper: ToastWrapper })

    const email = 'invalid email'

    act(() => {
      result.current.handleEmailChange(email)
      result.current.handleSubmit()
    })

    expect(result.current.error).toBe(MESSAGES.invalidEmail)
  })

  it('should save lead if the provided email is valid', async () => {
    const apiMock = useApiMock()

    const { result } = renderHook(useLeadsCapture, { wrapper: ToastWrapper })

    const email = 'joaopcarvalho.cds@gmail.com'

    act(() => {
      result.current.handleEmailChange(email)
    })

    await waitFor(() => {
      result.current.handleSubmit()
    })

    const leads = await apiMock.getLeads()

    expect(leads).toEqual([{ email }])
  })

  it('should show toast with a success message if the email is valid', async () => {
    useApiMock()

    const { result } = renderHook(useLeadsCapture, { wrapper: ToastWrapper })

    const email = 'joaopcarvalho.cds@gmail.com'

    act(() => {
      result.current.handleEmailChange(email)
    })

    await waitFor(() => {
      result.current.handleSubmit()
    })
  })
})
