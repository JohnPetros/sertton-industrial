import { act, waitFor } from '@testing-library/react-native'

import { useSidebar } from '../useSidebar'

import { renderHook } from '@/_tests_/customs/customRendeeHook'
import { useApiMock } from '@/_tests_/mocks/apiMock'
import { useDrawerStatusMock } from '@/_tests_/mocks/libs/react-navigation/useDrawerStatusMock'
import { useRouterMock } from '@/_tests_/mocks/libs/react-navigation/useRouterMock'
import { useProductsFilterStoreMock } from '@/_tests_/mocks/stores/productsFilterStoreMock'
import { ROUTES } from '@/utils/constants/routes'

jest.mock('expo-router')
jest.mock('@react-navigation/drawer')
jest.mock('@/services/api')

describe('useSidebar hook', () => {
  beforeEach(() => {
    useApiMock()
    useRouterMock()
    useDrawerStatusMock()
  })

  it('should fetch categories on first render', async () => {
    const apiMock = useApiMock()

    await waitFor(async () => {
      const { result } = renderHook(useSidebar)

      const categories = await apiMock.getCategories()

      expect(result.current.categories).toEqual(categories)
    })
  })

  it('should return both canShowAllCategories and isLoading as false on first render', async () => {
    await waitFor(async () => {
      const { result } = renderHook(useSidebar)

      expect(result.current.canShowAllCategories).toBe(false)
      expect(result.current.isLoading).toBe(false)
    })
  })

  it('should toggle canShowAllCategories value', async () => {
    await waitFor(() => {
      const { result } = renderHook(useSidebar)

      expect(result.current.canShowAllCategories).toBe(false)
      act(() => {
        result.current.handleShowAllCategories()
      })

      expect(result.current.canShowAllCategories).toBe(true)
    })
  })

  it('should be loading after selecting a category', async () => {
    await waitFor(async () => {
      const { result } = renderHook(useSidebar)

      const categoryId = 'category id'

      act(() => {
        result.current.handleCategory(categoryId)
      })

      expect(result.current.isLoading).toBe(true)
    })
  })

  it('should set store category id after selecting a category', async () => {
    const setCategoryIdMock = jest.fn()

    useProductsFilterStoreMock({
      actions: { setCategoryId: setCategoryIdMock },
    })

    await waitFor(() => {
      const { result } = renderHook(useSidebar)

      const categoryId = 'category id'

      act(() => {
        result.current.handleCategory(categoryId)
      })

      expect(setCategoryIdMock).toHaveBeenCalledWith(categoryId)
    })
  })

  it('should redirect user to products screen after selecting a category', async () => {
    const { pushMock } = useRouterMock()

    const categoryId = 'category id'

    await waitFor(() => {
      const { result } = renderHook(useSidebar)

      act(() => {
        result.current.handleCategory(categoryId)
      })

      expect(pushMock).toHaveBeenCalledWith(ROUTES.products)
    })
  })

  it('should redirect user to a specific route', async () => {
    const { pushMock } = useRouterMock()

    const route = 'specific route'

    await waitFor(() => {
      const { result } = renderHook(useSidebar)

      act(() => {
        result.current.handleNavigation(route)
      })

      expect(pushMock).toHaveBeenCalledWith(route)
    })
  })
})
