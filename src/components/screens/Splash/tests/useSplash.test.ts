import { renderHook } from '@testing-library/react-native'
import { useRouter } from 'expo-router'

import { useSplash } from '../useSplash'

import { ROUTES } from '@/utils/constants/routes'

jest.mock('expo-router')
jest.useFakeTimers()

describe('useSplash hook', () => {
  it('should redirect user to home screen after 2 seconds', () => {
    const pushMock = jest.fn()

    jest.mocked(useRouter).mockReturnValueOnce({
      push: pushMock,
    } as unknown as ReturnType<typeof useRouter>)

    renderHook(useSplash)

    expect(pushMock).not.toHaveBeenCalled()

    jest.advanceTimersByTime(2000)

    expect(pushMock).toHaveBeenCalledWith(ROUTES.home)
  })
})
