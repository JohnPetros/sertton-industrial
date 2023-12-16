import { useState } from 'react'
import { WebViewNavigation } from 'react-native-webview'

import { PaymentMethod } from '@/@types/paymentMethod'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCart } from '@/hooks/useCart'
import { useCartSummary } from '@/hooks/useCartSummary'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { getSearchParams } from '@/utils/helpers/getQueryParam'

export function usePaymentForm() {
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null)

  const { customer } = useCustomerContext()
  const { products, getSelectedSkus } = useCart()
  const { totalDiscount, totalToPay } = useCartSummary(products ?? [])

  const address = useCheckoutStore((store) => store.state.address)

  const api = useApi()

  async function createTransaction(
    paymentMethod: PaymentMethod,
    cardToken?: string
  ) {
    const products = getSelectedSkus()
    if (!customer || !products) return

    try {
      const response = await api.createTransaction({
        customer: {
          id: customer.id.toString(),
          type: customer.type === 'f' ? 'natural' : 'legal',
          email: customer.email,
          name: customer.name ?? '',
          document: (customer.type === 'f' ? customer.cpf : customer.cpf) ?? '',
          phone: customer.phone?.full_number ?? '',
          address: {
            number: Number(address.number),
            street: address.street,
            neighborhood: address.neighborhood,
            zipCode: address.zip_code,
            city: address.city,
            state: address.uf,
          },
        },
        products: products
          .map((product) => ({
            id: product.id.toString(),
            name: product.name,
            price: product.price_sale,
            height: product.height,
            length: product.length,
            weight: product.weight,
            width: product.width,
            sku: product.sku,
            quantity: product.quantity,
          }))
          .slice(0, 1),
        paymentMethod,
        cardToken,
      })
      console.log({ response })
    } catch (error) {
      api.handleError(error)
    }
  }

  async function saveOrder() {
    if (!customer?.addresses || !products) return

    const selectedAddress =
      customer.addresses.data.find(
        (address) => address.zip_code === customer.selectedAddressZipcode
      ) ?? customer.addresses.data[0]

    if (!selectedAddress) return

    try {
      await api.saveOrder({
        customer_id: customer.id,
        days_delivery: 3,
        status: 'waiting_payment',
        number: 111,
        value_products: totalToPay,
        value_discount: totalDiscount,
        items: products.map((product) => {
          const selectedSku = product.skus.data.find(
            (sku) => sku.id === product.selectedSkuId
          )

          return {
            product_id: product.id,
            quantity: product.quantity,
            price: selectedSku?.price_sale ?? 0,
            sku_id: selectedSku?.id ?? 0,
          }
        }),
        shipment_service: 'Shipment service',
        value_shipment: 14.5,
        address: selectedAddress,
      })
    } catch (error) {
      api.handleError(error)
    }
  }

  async function handlePaymentMethod(paymentMethod: PaymentMethod) {
    switch (paymentMethod) {
      case 'credit-card':
        await saveOrder()
        break
      case 'ticket':
        break
    }
  }

  function handlePaymentNavigation({ canGoBack, url }: WebViewNavigation) {
    const isCheckout = url.includes('mercadopago')

    if (!canGoBack || isCheckout) return

    setCheckoutUrl('')

    if (url.includes('success')) {
      const paymentMethod = getSearchParams(url, 'payment_type')
      handlePaymentMethod(paymentMethod as PaymentMethod)
    }

    // if (url.includes('failure')) {
    // }
  }

  function handlePaymentMethodChange(paymentMethod: string) {
    setSelectedPaymentMethod(paymentMethod as PaymentMethod)
  }

  return {
    checkoutUrl,
    selectedPaymentMethod,
    totalToPay: totalToPay - totalDiscount,
    createTransaction,
    handlePaymentNavigation,
    handlePaymentMethodChange,
  }
}
