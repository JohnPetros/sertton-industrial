import { act, renderHook, screen, waitFor } from '@testing-library/react-native'
import { View } from 'tamagui'

import { useCartItem } from '../useCartItem'

import { cartItemsMock } from '@/_tests_/mocks/cartItemsMock'
import { skusMock } from '@/_tests_/mocks/skusMock'
import { TamaguiProvider } from '@/providers/components/TamaguiProvider'
import { ToastProvider } from '@/providers/components/ToastProvider'
import { useCartStore } from '@/stores/cartStore'

const addItemMock = jest.fn()
const setItemQuantityMock = jest.fn()
const removeItemMock = jest.fn()
const removeAllItemsMock = jest.fn()

const Truck = () => <View />

jest.mock('phosphor-react-native', () => ({
  Truck: () => {
    return <Truck />
  },
}))

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

  it('should not cart item quantity if new quantity is larger than selected sku stock', async () => {
    const selectedSku = skusMock[0]

    const { result } = renderHook(() => useCartItem(skusMock, selectedSku.id))

    const newQuantity = selectedSku.total_in_stock + 1

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

  it('should show toast if selected sku is out of stock', async () => {
    const selectedSku = skusMock[0]

    const { result } = renderHook(() => useCartItem(skusMock, selectedSku.id), {
      wrapper: ({ children }) => (
        <TamaguiProvider>
          <ToastProvider>{children}</ToastProvider>
        </TamaguiProvider>
      ),
    })

    act(() => {
      result.current.handleReachMaxInStock()
    })

    await waitFor(() => {
      expect(
        screen.getByText(
          `Quantidade indisponível.\nDisponível em estoque: ${selectedSku.total_in_stock}`
        )
      )
    })
  })
})
