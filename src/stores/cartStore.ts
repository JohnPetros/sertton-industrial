import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { CartItem } from '@/@types/cartItem'
import { CART_KEY } from '@/services/storage/config/keys'
import { mmkvStorageProvider } from '@/services/storage/mmkv'

export type CartStoreState = {
  items: CartItem[]
}

type CartStoreActions = {
  addItem: (item: CartItem) => void
  removeItem: (itemSkuId: string) => void
  removeAllItems: () => void
  setItemQuantity: (itemSkuId: string, itemQuantity: number) => void
}

export type CartStoreProps = {
  state: CartStoreState
  actions: CartStoreActions
}

const initialState: CartStoreState = {
  items: [],
}

const cartStore: StateCreator<
  CartStoreProps,
  [['zustand/persist', unknown], ['zustand/immer', never]],
  [],
  CartStoreProps
> = (set) => ({
  state: initialState,
  actions: {
    addItem(item) {
      set(({ state }) => {
        const currentItemIndex = state.items.findIndex(
          (currentItem) => currentItem.skuId === item.skuId
        )

        if (currentItemIndex !== -1) {
          state.items.splice(currentItemIndex, 1)
        }

        state.items.push(item)
      })
    },

    removeItem(itemSkuId: string) {
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

    setItemQuantity(itemSkuId: string, itemQuantity: number) {
      set(({ state }) => {
        state.items = state.items.map((item) =>
          item.skuId === itemSkuId ? { ...item, quantity: itemQuantity } : item
        )
      })
    },
  },
})

export const useCartStore = create(
  persist(immer(cartStore), {
    version: 1,
    name: CART_KEY,
    storage: createJSONStorage(() => mmkvStorageProvider),
    partialize: (state) => {
      return Object.fromEntries(
        Object.entries(state).filter(([key]) => !['actions'].includes(key))
      )
    },
  })
)
