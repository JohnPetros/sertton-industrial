import { useInput } from '../../useInput'

const handleBlurMock = jest.fn()
const handleFocusMock = jest.fn()
const handleTextChangeMock = jest.fn()
const maskTextMock = jest.fn()

export function useInputMock(mock: Partial<ReturnType<typeof useInput>>) {
  jest.mocked(useInput).mockReturnValueOnce({
    handleBlur: handleBlurMock,
    handleFocus: handleFocusMock,
    handleTextChange: handleTextChangeMock,
    iconState: 'default',
    inputState: 'default',
    maskText: maskTextMock,
    ...mock,
  })

  return {
    handleBlurMock,
  }
}
