import { useRouter } from 'expo-router'
import { Router } from 'expo-router/build/types'

const pushMock = jest.fn()
const backMock = jest.fn()
const canGoBackMock = jest.fn()

export function useRouterMock() {
  jest.mocked(useRouter).mockReturnValueOnce({
    push: pushMock,
    back: backMock,
    canGoBack: canGoBackMock,
  } as unknown as Router)

  return {
    pushMock,
    backMock,
    canGoBackMock,
  }
}
