import {
  initialProductsFilterStoreState,
  ProductsfilterStoreActions,
  ProductsfilterStoreProps,
  ProductsfilterStoreState,
  useProductsFilterStore,
} from '@/stores/productsFilterStore'

type ProductsFilterStoreMockProps = {
  state: Partial<ProductsfilterStoreState>
  actions: Partial<ProductsfilterStoreActions>
}

const setSearchMock = jest.fn()
const setBrandsIdsMock = jest.fn()
const setCategoryIdMock = jest.fn()

export function useProductsFilterStoreMock(
  productFilterStoreMockProps?: Partial<ProductsFilterStoreMockProps>
) {
  useProductsFilterStore.setState({
    actions: {
      setSearch: setSearchMock,
      setBrandsIds: setBrandsIdsMock,
      setCategoryId: setCategoryIdMock,
    },
    state: {
      ...initialProductsFilterStoreState,
    },
    ...(productFilterStoreMockProps as unknown as Partial<ProductsfilterStoreProps>),
  })

  return {
    setSearchMock,
    setBrandsIdsMock,
    setCategoryIdMock,
  }
}
