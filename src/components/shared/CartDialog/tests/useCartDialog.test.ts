import { renderHook } from '@testing-library/react-native'

import { DialogRef } from '../../Dialog/types/DialogRef'
import { SkuSelectsRef } from '../../SkuSelects/types/SkuSelectsRef'
import { useCartDialog } from '../useCartDialog'

import { productsMock } from '@/_tests_/mocks/productsMock'
import { useRefMock } from '@/_tests_/mocks/useRefMock'
import { CartItem } from '@/@types/cartItem'
import { initialCartStoreState, useCartStore } from '@/stores/cartStore'

const productMock = productsMock[0]

const quantity = {
  _current: 1,
  set current(newQuantity: number) {
    this._current = newQuantity
  },
  get current() {
    return this._current
  },
}

const openMock = jest.fn()
const closeMock = jest.fn()
const onAddSkuToCartMock = jest.fn()
const addItemMock = jest.fn()

const dialogRefMock = useRefMock<DialogRef>({
  open: openMock,
  close: closeMock,
})

const skuSelectsMock = useRefMock<SkuSelectsRef>({
  selectedSku: null,
  onAddSkuToCart: onAddSkuToCartMock,
})

describe('useCartDialog hook', () => {
  beforeEach(() => {
    quantity.current = 1

    useCartStore.setState({
      actions: {
        addItem: addItemMock,
        removeItem: jest.fn(),
        removeAllItems: jest.fn(),
        setItemQuantity: jest.fn(),
      },
      state: initialCartStoreState,
    })
  })

  it('should change the product quantity', () => {
    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: productMock.skus,
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    const newQuantity = 3

    result.current.handleQuantityChange(newQuantity)

    expect(quantity._current).toBe(newQuantity)
  })

  it('should add an item to the cart if skuSelectsRef is null', () => {
    const skuSelectsMock = useRefMock<SkuSelectsRef | null>(null)

    skuSelectsMock.current

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: productMock.skus,
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    result.current.handleAddCartItem()

    expect(addItemMock).not.toHaveBeenCalled()
  })

  it('should not add an item to the cart if there are not product skus and onAddSkuToCart function return false', () => {
    const skuSelectsMock = useRefMock<SkuSelectsRef>({
      selectedSku: null,
      onAddSkuToCart: () => false,
    })

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: [],
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    result.current.handleAddCartItem()

    expect(addItemMock).not.toHaveBeenCalled()
  })

  it('should not add an item to the cart if selected sku is null', () => {
    const skuSelectsMock = useRefMock<SkuSelectsRef>({
      selectedSku: null,
      onAddSkuToCart: () => true,
    })

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: productMock.skus,
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    result.current.handleAddCartItem()

    expect(addItemMock).not.toHaveBeenCalled()
  })

  it('should add an item to the cart', () => {
    const selectedSku = productMock.skus[0]

    const skuSelectsMock = useRefMock<SkuSelectsRef>({
      selectedSku,
      onAddSkuToCart: () => true,
    })

    const { result } = renderHook(() =>
      useCartDialog({
        productSlug: productMock.slug,
        skus: productMock.skus,
        quantity,
        skuSelectsRef: skuSelectsMock,
        dialogRef: dialogRefMock,
      })
    )

    result.current.handleAddCartItem()

    const newItem: CartItem = {
      slug: productMock.slug,
      skuId: selectedSku.id,
      quantity: quantity._current,
    }

    expect(addItemMock).toHaveBeenCalledWith(newItem)
  })
})
