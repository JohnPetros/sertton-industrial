import { renderHook } from '@testing-library/react-native'

import { useRadio } from '../useRadio'

describe('useRadio hook', () => {
  it('should not be loading on first rendering', () => {
    const { result } = renderHook(useRadio)

    expect(result.current.isLoading).toBe(false)
  })
})
