import { act, fireEvent, screen } from '@testing-library/react-native'
import { View } from 'tamagui'

import { useSearch } from '../useSearch'
import { Search } from '..'

import { render } from '@/_tests_/customs/customRender'

const MagnifyingGlass = () => <View />

jest.mock('phosphor-react-native', () => ({
  MagnifyingGlass: () => {
    return <MagnifyingGlass />
  },
}))

jest.mock('../useSearch.ts')

const handleSearchMock = jest.fn()
const searchValueMock = 'bla'
const setSearchValueMock = jest.fn()

describe('Search component', () => {
  it('should render spinner when is loading', () => {
    const useSearchMock = jest.mocked(useSearch)

    useSearchMock.mockReturnValueOnce({
      isLoading: true,
      handleSearch: handleSearchMock,
      searchValue: searchValueMock,
      setSearchValue: setSearchValueMock,
    })

    render(<Search isFetching={true} />)

    expect(screen.getByTestId('spinner')).toBeTruthy()
  })

  it('should set search value on change input', () => {
    const useSearchMock = jest.mocked(useSearch)
    useSearchMock.mockReturnValueOnce({
      isLoading: true,
      handleSearch: handleSearchMock,
      searchValue: searchValueMock,
      setSearchValue: setSearchValueMock,
    })

    render(<Search isFetching={true} />)

    const input = screen.getByTestId('search-input')

    const newSearchValue = 'new serch value'

    act(() => {
      fireEvent.changeText(input, newSearchValue)
    })

    expect(setSearchValueMock).toHaveBeenCalledWith(newSearchValue)
  })

  it('should handle search on press button', () => {
    const useSearchMock = jest.mocked(useSearch)
    useSearchMock.mockReturnValueOnce({
      isLoading: false,
      handleSearch: handleSearchMock,
      searchValue: searchValueMock,
      setSearchValue: setSearchValueMock,
    })

    render(<Search isFetching={false} />)

    const button = screen.getByTestId('search-button')

    act(() => {
      fireEvent.press(button)
    })

    expect(handleSearchMock).toHaveBeenCalled()
  })

  it('should not handle search on press button which is disabled when isLoading is set to true', () => {
    const useSearchMock = jest.mocked(useSearch)
    useSearchMock.mockReturnValueOnce({
      isLoading: true,
      handleSearch: handleSearchMock,
      searchValue: searchValueMock,
      setSearchValue: setSearchValueMock,
    })

    render(<Search isFetching={true} />)

    const button = screen.getByTestId('search-button')

    act(() => {
      fireEvent.press(button)
    })

    expect(handleSearchMock).not.toHaveBeenCalledWith()
  })
})
