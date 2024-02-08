import { act, renderHook } from '@testing-library/react-native'
import { useRouter } from 'expo-router'

import { useSearch } from '../useSearch'

import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { ROUTES } from '@/utils/constants/routes'

const storedSearch = 'storedSearch'

const setSearchMock = jest.fn()
const routerPushMock = jest.fn()

jest.mock('expo-router')

describe('useSearch hook', () => {
  beforeEach(() => {
    act(() => {
      useProductsFilterStore.setState({
        actions: {
          setSearch: setSearchMock,
          setBrandsIds: jest.fn(),
          setCateforyId: jest.fn(),
        },
        state: {
          search: storedSearch,
          categoryId: '',
          brandsIds: [],
        },
      })
    })
  })

  it('should be loading if there is a fetching', () => {
    const { result } = renderHook(() => useSearch(true))

    expect(result.current.isLoading).toBe(true)
  })

  it('should set search value to stored search value', () => {
    const { result } = renderHook(() => useSearch(false))

    expect(result.current.searchValue).toBe(storedSearch)
  })

  it('should not change search value when is fetching', () => {
    const { result } = renderHook(() => useSearch(true))

    act(() => {
      result.current.handleSearch()
    })

    expect(setSearchMock).not.toHaveBeenCalled()
  })

  it('should change search value', () => {
    jest.mocked(useRouter).mockReturnValue({
      push: routerPushMock,
    } as never)

    const { result } = renderHook(() => useSearch(false))

    act(() => {
      result.current.handleSearch()
    })

    expect(setSearchMock).toHaveBeenCalled()
  })

  it('should change to products route after change search value', () => {
    jest.mocked(useRouter).mockReturnValue({
      push: routerPushMock,
    } as never)

    const { result } = renderHook(() => useSearch(false))

    act(() => {
      result.current.handleSearch()
    })

    expect(routerPushMock).toHaveBeenCalledWith(ROUTES.products)
  })
})
