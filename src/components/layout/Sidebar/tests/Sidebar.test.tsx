import './mocks/IconsMock'
import './mocks/ContactsMock'

import { fireEvent, screen } from '@testing-library/react-native'

import { ROUTE_BUTTONS } from '../constants/route-buttons'
import { Sidebar } from '..'

import { TEST_IDS } from './constants/test-ids'
import { useSidebarMock } from './mocks/useSidebarMock'

import { render } from '@/_tests_/customs/customRender'
import { categoriesMock } from '@/_tests_/mocks/categoriesMock'
import { useProductsFilterStoreMock } from '@/_tests_/mocks/stores/productsFilterStoreMock'

jest.mock('../useSidebar.ts')

describe('Sidebar component', () => {
  beforeEach(() => {
    useProductsFilterStoreMock()
  })

  it.each(ROUTE_BUTTONS)('should render route button $title', ({ title }) => {
    useSidebarMock()

    render(<Sidebar />)

    const routeButton = screen.getByText(title)

    expect(routeButton).toBeTruthy()
  })

  it('should render 4 categories at most when cannot show all categories', () => {
    useSidebarMock({ canShowAllCategories: false })

    render(<Sidebar />)

    const categories = screen.getAllByTestId(TEST_IDS.categoryButton)

    expect(categories.length).toBe(4)
  })

  it('should render all categories when can show all categories', () => {
    const { categoriesMock } = useSidebarMock({ canShowAllCategories: true })

    render(<Sidebar />)

    const categories = screen.getAllByTestId(TEST_IDS.categoryButton)

    expect(categories.length).toBe(categoriesMock.length)
  })

  it('should render spinner when there is a selected category', () => {
    const { categoriesMock } = useSidebarMock({
      isLoading: true,
      canShowAllCategories: true,
    })

    const selectedCategory = categoriesMock[0]
    useProductsFilterStoreMock({ state: { categoryId: selectedCategory.id } })

    render(<Sidebar />)

    const spinner = screen.getByTestId(TEST_IDS.spinner)

    expect(spinner).toBeTruthy()
  })

  it('should handle navigation on press route button', () => {
    const { handleNavigationMock } = useSidebarMock({
      canShowAllCategories: true,
      categories: categoriesMock,
    })

    render(<Sidebar />)

    const routeButton = ROUTE_BUTTONS[0]

    fireEvent.press(screen.getByText(routeButton.title))

    expect(handleNavigationMock).toHaveBeenCalledWith(routeButton.route)
  })
})
