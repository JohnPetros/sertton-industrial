import { act, renderHook, waitFor } from '@testing-library/react-native'

import { useTabs } from '@/components/Tabs/useTabs'
import { tabsMocks } from '@/tests/mocks/tabsMock'

describe('useTabs hook', () => {
  it('should active first tab', () => {
    const { result } = renderHook(() => useTabs(tabsMocks))

    expect(result.current.activeTab).toBe(tabsMocks[0].value)
    expect(result.current.containerSize).toBe(tabsMocks[0].size)
    expect(result.current.handleTabPress).toBeInstanceOf(Function)
  })

  it('should change active tab', async () => {
    const { result } = renderHook(() => useTabs(tabsMocks))

    act(() => {
      result.current.handleTabPress(tabsMocks[1].value)
    })

    await waitFor(() => {
      expect(result.current.activeTab).toBe(tabsMocks[1].value)
    })
  })
})
