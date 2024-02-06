import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import type { CartItem } from '@/@types/cartItem'
import { cartStorage } from '@/services/storage/cartStorage'
import { CART_KEY } from '@/services/storage/config/keys'
import { mmkvProvider } from '@/services/storage/mmkv'

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
    storage: createJSONStorage(() => cartStorage(mmkvProvider)),
    partialize: (state) => {
      return Object.fromEntries(
        Object.entries(state).filter(([key]) => !['actions'].includes(key))
      )
    },
  })
)

const payload = {
  customer: {
    active: true,
    addresses: { data: [] },
    cnpj: null,
    cpf: '44606238895',
    email: 'madruga.@gmail.com',
    homephone: 0,
    id: 179465223,
    name: 'Seu Madruga',
    phone: {
      area_code: '12',
      formated_number: '12988815499',
      full_number: '12988815499',
      number: '988815499',
      whatsapp_link: 'https://api.whatsapp.com/send?phone=5512988815499',
    },
    razao_social: null,
    selectedAddressZipcode: null,
    type: 'f',
  },
  products: [
    {
      id: 123456,
      name: 'Chinfurinfula',
      price: 99.99,
      height: 40,
      length: 32,
      weight: 4,
      width: 20,
      sku: {
        id: 20,
        sku: 203,
        price_cost: 99,
        price_sale: 99,
        price_discount: 0,
        height: 40,
        length: 32,
        weight: 4,
        width: 20,
        images: { data: [] },
        variations: [],
        total_in_stock: 10,
      },
      quantity: 1,
    },
  ],
  paymentMethod: 'credit-card',
  shipmentService: {
    name: 'correios da massa',
    service: 'serviço da massa',
    price: 24,
    days: 24,
  },
}

const order = {
  status: 'waiting_payment',
  number: 99,
  customer_id: 99,
  value_products: 99,
  value_shipment: 99,
  value_discount: 99,
  value_total: 99,
  shipment_service: 'frete da massa',
  days_delivery: 2,
  address: {
    id: 123,
    receiver: 'Seu madruga',
    zipcode: 12231440,
    street: 'Rua ali perto',
    number: 42,
    neighborhood: 'Bairro do limoeiro',
    city: 'Cidade dos poetas mortos',
    uf: 'SP',
  },
  items: [
    {
      product_id: 55,
      sku_id: 44,
      quantity: 1,
      price: 99.99,
    },
  ],
  transactions: [
    {
      customer_id: 123,
      amount: 99.99,
      installments: 0,
      status: 'waiting_payment',
      holder_name: 'Seu madruga',
      holder_document: '12345678912',
    },
  ],
}
