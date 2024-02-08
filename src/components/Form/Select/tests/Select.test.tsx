import { act, fireEvent, screen, waitFor } from '@testing-library/react-native'
import { View } from 'tamagui'

import { useSelect } from '../useSelect'
import { Select } from '..'

import { TEST_IDS } from './utils/test-ids'

import { render } from '@/_tests_/customs/customRender'
import { red } from '@/styles/colors'

const CaretDown = () => <View />
const Check = () => <View />
const X = () => <View />

jest.mock('phosphor-react-native', () => ({
  CaretDown: () => {
    return <CaretDown />
  },
  Check: () => {
    return <Check />
  },
  X: () => {
    return <X />
  },
}))

jest.mock('../useSelect.ts')

const openMock = jest.fn()
const closeMock = jest.fn()
const resetMock = jest.fn()
const handleOpenChangeMock = jest.fn()
const handleValueChangeMock = jest.fn()
const error = false
const isOpen = false
const isLoading = false
const selectedValue = 'selected value'

const defaultValue = 'Selecionar'
const label = 'Selecione'
const hasError = false
const isDisabled = false
const width = 200
const items = ['item 1', 'item 2', 'item 3', 'item 4']
const onChangeMock = jest.fn()

describe('Select component', () => {
  it('Should render label', () => {
    jest.mocked(useSelect).mockReturnValueOnce({
      close: closeMock,
      open: openMock,
      error,
      isOpen,
      isLoading,
      handleChangeValue: handleValueChangeMock,
      handleOpenChange: handleOpenChangeMock,
      reset: resetMock,
      selectedValue,
    })

    render(
      <Select
        defaultValue={defaultValue}
        label={label}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText(label)).toBeTruthy()
  })

  it('Should render selected value', () => {
    jest.mocked(useSelect).mockReturnValueOnce({
      close: closeMock,
      open: openMock,
      error,
      isOpen,
      isLoading,
      handleChangeValue: handleValueChangeMock,
      handleOpenChange: handleOpenChangeMock,
      reset: resetMock,
      selectedValue,
    })

    render(
      <Select
        defaultValue={defaultValue}
        label={label}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText(selectedValue)).toBeTruthy()
  })

  it('Should have width', () => {
    jest.mocked(useSelect).mockReturnValueOnce({
      close: closeMock,
      open: openMock,
      error,
      isOpen,
      isLoading,
      handleChangeValue: handleValueChangeMock,
      handleOpenChange: handleOpenChangeMock,
      reset: resetMock,
      selectedValue,
    })

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    const container = screen.getByTestId(TEST_IDS.container)
    const trigger = screen.getByTestId(TEST_IDS.trigger)

    expect(container.props.style.width).toBe(width)
    expect(trigger.props.style.width).toBe(width)
  })

  it('Should render the default value first', () => {
    jest.mocked(useSelect).mockReturnValueOnce({
      handleChangeValue: handleValueChangeMock,
      handleOpenChange: handleOpenChangeMock,
      reset: resetMock,
      close: closeMock,
      open: openMock,
      error,
      isOpen,
      isLoading,
      selectedValue,
    })

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText(defaultValue)).toBeTruthy()
  })

  it('Should open on press trigger', () => {
    jest.mocked(useSelect).mockReturnValueOnce({
      close: closeMock,
      open: openMock,
      error,
      isOpen,
      isLoading,
      handleChangeValue: handleValueChangeMock,
      handleOpenChange: handleOpenChangeMock,
      reset: resetMock,
      selectedValue,
    })

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={false}
        onChange={onChangeMock}
      />
    )

    const trigger = screen.getByTestId(TEST_IDS.trigger)

    fireEvent.press(trigger)

    expect(openMock).toHaveBeenCalled()
  })

  it('Should not open on press trigger if it is disabled', () => {
    jest.mocked(useSelect).mockReturnValueOnce({
      close: closeMock,
      open: openMock,
      error,
      isOpen,
      isLoading,
      handleChangeValue: handleValueChangeMock,
      handleOpenChange: handleOpenChangeMock,
      reset: resetMock,
      selectedValue,
    })

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={true}
        onChange={onChangeMock}
      />
    )

    const trigger = screen.getByTestId(TEST_IDS.trigger)

    fireEvent.press(trigger)

    expect(openMock).not.toHaveBeenCalled()
  })

  it('Should trigger have red color if there is an error', () => {
    jest.mocked(useSelect).mockReturnValueOnce({
      close: closeMock,
      open: openMock,
      error: true,
      isOpen,
      isLoading,
      handleChangeValue: handleValueChangeMock,
      handleOpenChange: handleOpenChangeMock,
      reset: resetMock,
      selectedValue,
    })

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={true}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    const trigger = screen.getByTestId(TEST_IDS.trigger)

    fireEvent.press(trigger)

    expect(trigger.props.style.borderTopColor).toBe(red.red700)
    expect(trigger.props.style.borderLeftColor).toBe(red.red700)
    expect(trigger.props.style.borderRightColor).toBe(red.red700)
    expect(trigger.props.style.borderBottomColor).toBe(red.red700)
    expect(trigger.props.style.backgroundColor).toBe(red.red50)
  })

  it.each(items)('Should render item', (item) => {
    jest.mocked(useSelect).mockReturnValueOnce({
      close: closeMock,
      open: openMock,
      error,
      isOpen,
      isLoading,
      handleChangeValue: handleValueChangeMock,
      handleOpenChange: handleOpenChangeMock,
      reset: resetMock,
      selectedValue,
    })

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={true}
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText(item)).toBeTruthy()
  })
})
