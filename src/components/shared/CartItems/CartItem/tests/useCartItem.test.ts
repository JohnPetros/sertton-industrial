import './mocks/IconsMock'

import { act, renderHook, waitFor } from '@testing-library/react-native'

import { useCartItem } from '../useCartItem'

import { cartItemsMock } from '@/_tests_/mocks/cartItemsMock'
import { skusMock } from '@/_tests_/mocks/skusMock'
import { useCartStore } from '@/stores/cartStore'

const addItemMock = jest.fn()
const setItemQuantityMock = jest.fn()
const removeItemMock = jest.fn()
const removeAllItemsMock = jest.fn()

describe('useCartItem hook', () => {
  beforeEach(() => {
    act(() => {
      useCartStore.setState({
        state: {
          items: cartItemsMock,
        },
        actions: {
          removeItem: removeItemMock,
          removeAllItems: removeAllItemsMock,
          addItem: addItemMock,
          setItemQuantity: setItemQuantityMock,
        },
      })
    })
  })

  it('should select sku', () => {
    const selectedSku = skusMock[0]

    const { result } = renderHook(() => useCartItem(skusMock, selectedSku.id))

    expect(result.current.selectedSku).toEqual(selectedSku)
  })

  it('should remove cart item by selected sku id', () => {
    const selectedSku = skusMock[0]

    const { result } = renderHook(() => useCartItem(skusMock, selectedSku.id))

    act(() => {
      result.current.handleRemoveItem()
    })

    expect(removeItemMock).toHaveBeenCalledWith(selectedSku.id)
  })

  it('should not set cart item quantity if new quantity is larger than the selected sku stock', async () => {
    const selectedSku = skusMock[0]

    const { result } = renderHook(() => useCartItem(skusMock, selectedSku.id))

    const newQuantity = selectedSku.stock + 1

    act(() => {
      result.current.handleQuantityChange(newQuantity)
    })

    await waitFor(() => {
      expect(setItemQuantityMock).not.toHaveBeenCalledWith(
        selectedSku.id,
        newQuantity
      )
    })
  })
})
