import { renderHook, waitFor } from '@testing-library/react-native'
import { useRouter } from 'expo-router'

import { useSplash } from '../useSplash'

import { ROUTES } from '@/utils/constants/routes'

jest.mock('expo-router')

describe('useSplash hook', () => {
  it('should redirect user to home screen after 2 seconds', async () => {
    const pushMock = jest.fn()

    jest.mocked(useRouter).mockReturnValueOnce({
      push: pushMock,
    } as unknown as ReturnType<typeof useRouter>)

    renderHook(useSplash)

    await waitFor(
      () => {
        expect(pushMock).toHaveBeenCalledWith(ROUTES.home)
      },
      { timeout: 2024 }
    )
  })
})
