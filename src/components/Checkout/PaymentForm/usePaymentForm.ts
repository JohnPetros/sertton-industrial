import { useEffect, useState } from 'react'
import { WebViewNavigation } from 'react-native-webview'

import { PaymentMethod } from '@/@types/paymentMethod'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCart } from '@/hooks/useCart'
import { useCartSummary } from '@/hooks/useCartSummary'
import { useApi } from '@/services/api'
import { getSearchParams } from '@/utils/helpers/getQueryParam'

export function usePaymentForm() {
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null)

  const { customer } = useCustomerContext()
  const { products } = useCart()
  const { totalDiscount, totalToPay } = useCartSummary(products ?? [])

  const api = useApi()

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
      // api.handleError(error)
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

  async function checkout() {
    if (!customer || !products) return

    try {
      const checkoutUrl = await api.checkout({
        customer: {
          id: customer.id.toString(),
          email: customer.email,
          name: customer.name ?? '',
        },
        products: products.map((product) => {
          const price =
            product.skus.data.find((sku) => sku.id === product.selectedSkuId)
              ?.price_sale ?? 0

          return {
            id: product.id.toString(),
            name: product.name,
            price,
            quantity: product.quantity,
          }
        }),
      })

      if (checkoutUrl) setCheckoutUrl(checkoutUrl)
    } catch (error) {
      // api.handleError(error)
    }
  }

  function handlePaymentMethodChange(paymentMethod: string) {
    setSelectedPaymentMethod(paymentMethod as PaymentMethod)
  }

  return {
    checkoutUrl,
    selectedPaymentMethod,
    handlePaymentNavigation,
    handlePaymentMethodChange,
    checkout,
    totalToPay: totalToPay - totalDiscount,
  }
}
