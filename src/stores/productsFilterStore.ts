import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type ProductsfilterStoreState = {
  search: string
  categoryId: string
  brandsIds: string[]
}

export type ProductsfilterStoreActions = {
  setSearch: (search: string) => void
  setCategoryId: (categoryId: string) => void
  setBrandsIds: (brandsIds: string[]) => void
}

export type ProductsfilterStoreProps = {
  state: ProductsfilterStoreState
  actions: ProductsfilterStoreActions
}

export const initialProductsFilterStoreState: ProductsfilterStoreState = {
  search: '',
  categoryId: '',
  brandsIds: [],
}

export const useProductsFilterStore = create<ProductsfilterStoreProps>()(
  immer((set) => {
    return {
      state: initialProductsFilterStoreState,
      actions: {
        setSearch(search: string) {
          return set(({ state }) => {
            state.search = search
            state.categoryId = ''
            state.brandsIds = []
          })
        },
        setCategoryId(categoryId: string) {
          return set(({ state }) => {
            state.categoryId = categoryId
            state.search = ''
            state.brandsIds = []
          })
        },
        setBrandsIds(brandsIds: string[]) {
          return set(({ state }) => {
            state.brandsIds = brandsIds
          })
        },
      },
    }
  })
)
