import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type ProductsfilterStoreState = {
  search: string
  categoryId: string
  brandsIds: string[]
}

type ProductsfilterStoreActions = {
  setSearch: (search: string) => void
  setCateforyId: (categoryId: string) => void
  setBrandsIds: (brandsIds: string[]) => void
}

type ProductsfilterStoreProps = {
  state: ProductsfilterStoreState
  actions: ProductsfilterStoreActions
}

const initialState: ProductsfilterStoreState = {
  search: '',
  categoryId: '',
  brandsIds: [],
}

export const useProductsFilterStore = create<ProductsfilterStoreProps>()(
  immer((set) => {
    return {
      state: initialState,
      actions: {
        setSearch(search: string) {
          return set(({ state }) => {
            state.search = search
            state.categoryId = ''
            state.brandsIds = []
          })
        },
        setCateforyId(categoryId: string) {
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
