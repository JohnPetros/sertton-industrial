import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { CartItem } from '@/@types/cartItem'

export type CartStoreState = {
  items: CartItem[]
}

type CartStoreActions = {
  addItem: (item: CartItem) => void
  removeItem: (itemSlug: string) => void
}

type CartStoreProps = {
  state: CartStoreState
  actions: CartStoreActions
}

const initialState: CartStoreState = {
  items: [],
}

export const useCartStore = create<CartStoreProps>()(
  immer((set) => {
    return {
      state: initialState,
      actions: {
        removeItem(itemSlug: string) {
          set(({ state }) => {
            const updatedItems = state.items.filter(
              (item) => item.slug !== itemSlug
            )
            state.items = updatedItems
          })
        },

        addItem(item) {
          set(({ state, actions }) => {
            const currentItem = state.items.some(
              (currentItem) => currentItem.slug === item.slug
            )

            if (currentItem) {
              actions.removeItem(item.slug)
            }

            state.items.push(item)
          })
        },
      },
    }
  })
)
