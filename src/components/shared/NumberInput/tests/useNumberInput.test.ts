import { act, renderHook } from '@testing-library/react-native'

import { useNumberInput } from '../useNumberInput'

const onChangeNumberMock = jest.fn()
const onReachMaxMock = jest.fn()

describe('useNumberInput hook', () => {
  it('should return a default number value', () => {
    const defaulNumber = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: 1,
        max: 500,
      })
    )

    expect(result.current.numberValue).toBe(defaulNumber)
  })

  it('should decrease number value', () => {
    const defaulNumber = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: 1,
        max: 500,
      })
    )

    act(() => {
      result.current.handleDecreaseValue()
    })

    expect(result.current.numberValue).toBe(defaulNumber - 1)
  })

  it('should not decrease number value when the new number is less than the minimum', () => {
    const defaulNumber = 100
    const min = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: min,
        max: 500,
      })
    )

    act(() => {
      result.current.handleDecreaseValue()
    })

    expect(result.current.numberValue).toBe(defaulNumber)
  })

  it('should increase number value', () => {
    const defaulNumber = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        min: 1,
        max: 500,
      })
    )

    act(() => {
      result.current.handleIncreaseValue()
    })

    expect(result.current.numberValue).toBe(defaulNumber + 1)
  })

  it('should not increase number value when the new number is greater than the maximum', () => {
    const defaulNumber = 100
    const max = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        max: max,
        min: 1,
      })
    )

    act(() => {
      result.current.handleIncreaseValue()
    })

    expect(result.current.numberValue).toBe(defaulNumber)
  })

  it('should call a function on reach max number value', () => {
    const defaulNumber = 100
    const max = 100

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        max: max,
        min: 1,
      })
    )

    act(() => {
      result.current.handleIncreaseValue()
    })

    expect(onReachMaxMock).toHaveBeenCalled()
  })

  it('should call a function on change number value', () => {
    const defaulNumber = 100
    const max = 500

    const { result } = renderHook(() =>
      useNumberInput({
        number: defaulNumber,
        onChangeNumber: onChangeNumberMock,
        onReachMax: onReachMaxMock,
        max: max,
        min: 1,
      })
    )

    act(() => {
      result.current.handleIncreaseValue()
    })

    expect(onChangeNumberMock).toHaveBeenCalled()
  })
})
