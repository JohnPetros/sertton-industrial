import { act, fireEvent, screen } from '@testing-library/react-native'
import { View } from 'tamagui'

import { useNumberInput } from '../useNumberInput'
import { NumberInput } from '..'

import { render } from '@/_tests_/customs/customRender'

const label = 'label'
const numberValue = 10

const onChangeNumberMock = jest.fn()
const onReachMaxMock = jest.fn()

const handleDecreaseValueMock = jest.fn()
const handleIncreaseValueMock = jest.fn()

const Minus = () => <View />
const Plus = () => <View />

jest.mock('phosphor-react-native', () => ({
  Plus: () => {
    return <Plus />
  },
  Minus: () => {
    return <Minus />
  },
}))

jest.mock('../useNumberInput.ts')

describe('NumberInput component', () => {
  it('should render number values', () => {
    jest.mocked(useNumberInput).mockReturnValueOnce({
      numberValue,
      handleDecreaseValue: handleDecreaseValueMock,
      handleIncreaseValue: handleIncreaseValueMock,
    })

    render(
      <NumberInput
        label={label}
        onChangeNumber={onChangeNumberMock}
        onReachMax={onReachMaxMock}
        number={numberValue}
      />
    )

    expect(screen.getByText(numberValue.toString()))
  })

  it('Should decrease value', () => {
    jest.mocked(useNumberInput).mockReturnValueOnce({
      numberValue,
      handleDecreaseValue: handleDecreaseValueMock,
      handleIncreaseValue: handleIncreaseValueMock,
    })

    render(
      <NumberInput
        label={label}
        onChangeNumber={onChangeNumberMock}
        onReachMax={onReachMaxMock}
        number={numberValue}
      />
    )

    const button = screen.getByTestId('decrease-value-button')

    act(() => {
      fireEvent.press(button)
    })

    expect(handleDecreaseValueMock).toHaveBeenCalled()
  })

  it('Should increase value', () => {
    jest.mocked(useNumberInput).mockReturnValueOnce({
      numberValue,
      handleDecreaseValue: handleDecreaseValueMock,
      handleIncreaseValue: handleIncreaseValueMock,
    })

    render(
      <NumberInput
        label={label}
        onChangeNumber={onChangeNumberMock}
        onReachMax={onReachMaxMock}
        number={numberValue}
      />
    )

    const button = screen.getByTestId('increase-value-button')

    act(() => {
      fireEvent.press(button)
    })

    expect(handleIncreaseValueMock).toHaveBeenCalled()
  })
})
