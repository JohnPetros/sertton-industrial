import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import type { CartItem } from '@/@types/cartItem'

export type CartStoreState = {
  items: CartItem[]
}

type CartStoreActions = {
  addItem: (item: CartItem) => void
  removeItem: (itemSkuId: number) => void
  removeAllItems: () => void
  setItemQuantity: (itemSkuId: number, itemQuantity: number) => void
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
        addItem(item) {
          set(({ state }) => {
            const currentItem = state.items.find(
              (currentItem) => currentItem.slug === item.slug
            )

            if (!currentItem) {
              state.items.push(item)
            }
          })
        },

        removeItem(itemSkuId: number) {
          set(({ state }) => {
            const updatedItems = state.items.filter(
              (item) => item.skuId !== itemSkuId
            )
            state.items = updatedItems
          })
        },

        removeAllItems() {
          set(({ state }) => {
            state.items = []
          })
        },

        setItemQuantity(itemSkuId: number, itemQuantity: number) {
          set(({ state }) => {
            state.items = state.items.map((item) =>
              item.skuId === itemSkuId
                ? { ...item, quantity: itemQuantity }
                : item
            )
          })
        },
      },
    }
  })
)
