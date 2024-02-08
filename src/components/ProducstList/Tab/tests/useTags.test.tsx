import { act, renderHook, waitFor } from '@testing-library/react-native'

import { useTags } from '../useTags'

import { useApiMock } from '@/_tests_/mocks/apiMock'
import { CacheWrapper } from '@/_tests_/wrappers/CacheWrapper'
import { initializeHttpProvider } from '@/services/api/http'
import { AxiosHttpProvider } from '@/services/api/http/axios'
import { useProductsFilterStore } from '@/stores/productsFilterStore'

jest.mock('@/services/api')

const setBrandsIdsMock = jest.fn()

async function renderUseTagsHook(selectedBrandsIds: string[]) {
  act(() => {
    useProductsFilterStore.setState({
      actions: {
        setBrandsIds: setBrandsIdsMock,
        setSearch: jest.fn(),
        setCateforyId: jest.fn(),
      },
      state: {
        search: '',
        categoryId: '',
        brandsIds: selectedBrandsIds,
      },
    })
  })

  return await waitFor(() => renderHook(useTags, { wrapper: CacheWrapper }))
}

describe('useTags hook', () => {
  beforeAll(() => {
    initializeHttpProvider(AxiosHttpProvider)
  })

  it('should remove a selected brand id and tag', async () => {
    const apiMock = useApiMock()
    const brandsMock = await apiMock.getBrands()
    const removedBrand = brandsMock[0]

    const selectedBrandsIdsMock = [...brandsMock.map(({ id }) => id)]

    const { result } = await renderUseTagsHook(selectedBrandsIdsMock)

    act(() => {
      result.current.handleTag('brand', removedBrand.id)
    })

    expect(setBrandsIdsMock).toHaveBeenCalledWith(
      selectedBrandsIdsMock.slice(1)
    )
  })

  it('should return brands and tags', async () => {
    const apiMock = useApiMock()
    const brandsMock = await apiMock.getBrands()

    const { result } = await renderUseTagsHook([])

    expect(result.current.brands).toEqual(brandsMock)
    expect(result.current.tags).toEqual(
      brandsMock.map((brand) => ({
        id: brand.id,
        type: 'brand',
        title: brand.name,
      }))
    )
  })
})
