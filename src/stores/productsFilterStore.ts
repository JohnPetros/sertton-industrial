import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type ProductsfilterStoreState = {
  search: string
  categoryId: number
  brandsIds: number[]
}

type ProductsfilterStoreActions = {
  setSearch: (search: string) => void
  setCateforyId: (categoryId: number) => void
  setBrandsIds: (brandsIds: number[]) => void
}

type ProductsfilterStoreProps = {
  state: ProductsfilterStoreState
  actions: ProductsfilterStoreActions
}

const initialState: ProductsfilterStoreState = {
  search: '',
  categoryId: 0,
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
            state.categoryId = 0
            state.brandsIds = []
          })
        },
        setCateforyId(categoryId: number) {
          return set(({ state }) => {
            state.categoryId = categoryId
            state.search = ''
            state.brandsIds = []
          })
        },
        setBrandsIds(brandsIds: number[]) {
          return set(({ state }) => {
            state.brandsIds = brandsIds
          })
        },
      },
    }
  })
)
