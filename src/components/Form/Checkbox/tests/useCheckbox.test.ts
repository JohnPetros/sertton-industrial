import { act, renderHook } from '@testing-library/react-native'

import { useCheckbox } from '../useCheckbox'

const valueMock = 'checkboxValueMock'
const onChangeMock = jest.fn()

describe('useCheckbox hook', () => {
  it('should have default check', () => {
    const defaultCheck = true

    const { result } = renderHook(() =>
      useCheckbox(valueMock, defaultCheck, onChangeMock)
    )

    expect(result.current.isChecked).toBe(defaultCheck)
  })

  it('should change check', () => {
    const changedChecked = true

    const { result } = renderHook(() =>
      useCheckbox(valueMock, false, onChangeMock)
    )

    act(() => {
      result.current.handleCheckedChange(changedChecked)
    })

    expect(onChangeMock).toHaveBeenCalledWith(valueMock, changedChecked)
  })
})
