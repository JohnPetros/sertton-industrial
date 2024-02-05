import { useState } from 'react'
import { useRouter } from 'expo-router/src/hooks'

import { OrderStatus } from '@/@types/order'
import { PaymentConfig, PaymentMethod } from '@/@types/paymentMethod'
import { Transaction, TransactionStatus } from '@/@types/transaction'
import { useAppError } from '@/components/AppError/useAppError'
import { useCartSummary } from '@/components/CartSummary/useCartSummary'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { useCart } from '@/hooks/useCart'
import { useApi } from '@/services/api'
import { useDate } from '@/services/date'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { ROUTES } from '@/utils/constants/routes'
import { generateRandomNumber } from '@/utils/helpers/generateRandomNumber'
import { getCreditCardType } from '@/utils/helpers/getCredtiCardType'

export function usePaymentForm() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null)

  const { customer } = useCustomerContext()
  const { products, getSelectedSkus } = useCart()
  const { totalDiscount, totalToPay, subtotal } = useCartSummary(products ?? [])

  const setTransaction = useCheckoutStore(
    (store) => store.actions.setTransaction
  )
  const { address, shipmentService, creditCard } = useCheckoutStore(
    (store) => store.state
  )
  const api = useApi()
  const router = useRouter()
  const date = useDate()
  const { throwAppError } = useAppError()

  async function getPaymentConfigId() {
    const paymentConfigs = await api.getPaymentConfigs()

    const creditCardType = getCreditCardType(creditCard.number)

    let paymentConfigId: number | undefined

    switch (selectedPaymentMethod) {
      case 'pix':
        paymentConfigId = paymentConfigs.find(
          (paymentConfig) => paymentConfig.is_pix
        )?.id
        break
      case 'ticket':
        paymentConfigId = paymentConfigs.find(
          (paymentConfig) => paymentConfig.is_billet
        )?.id
        break
      case 'credit-card':
        if (!creditCardType) {
          throwAppError('Número de cartão de crédito inválido')
          return
        }
        paymentConfigId = paymentConfigs.find(
          (paymentConfig) => paymentConfig.alias === creditCardType
        )?.id
        break
      default:
        return 0
    }

    return paymentConfigId
  }

  async function saveOrder(transactionStatus: TransactionStatus) {
    if (!customer?.addresses || !products || !shipmentService) return

    const selectedAddress =
      customer.addresses.data.find(
        (address) => address.zip_code === customer.selectedAddressZipcode
      ) ?? customer.addresses.data[0]

    if (!selectedAddress) return

    const amount = subtotal - totalDiscount + shipmentService.price
    const paymentId = await getPaymentConfigId()

    if (!paymentId) {
      throwAppError('Método de pagamento inválido')
      return
    }

    const orderStatus: Record<TransactionStatus, OrderStatus> = {
      pending: 'waiting_payment',
      cancelled: 'cancelled',
      approved: 'paid',
      rejected: 'refused',
    }

    console.log(
      products.map((product) => {
        const selectedSku = product.skus.data.find(
          (sku) => sku.id === product.selectedSkuId
        )

        return {
          product_id: product.id,
          quantity: product.quantity,
          price: selectedSku?.price_sale ?? 0,
          sku_id: selectedSku?.id ?? 0,
          sku: selectedSku?.sku,
        }
      })
    )

    try {
      const response = await api.saveOrder({
        status: 'waiting_payment',
        customer_id: customer.id,
        days_delivery: 3,
        number: generateRandomNumber(),
        value_products: subtotal,
        shipment_service: shipmentService.name,
        value_shipment: shipmentService.price,
        value_discount: totalDiscount,
        value_total: amount,
        items: products.map((product) => {
          const selectedSku = product.skus.data.find(
            (sku) => sku.id === product.selectedSkuId
          )
          return {
            product_id: product.id,
            quantity: product.quantity,
            price: selectedSku?.price_discount ?? 0,
            sku_id: selectedSku?.id ?? 0,
            sku: selectedSku?.sku,
          }
        }),
        address: [
          {
            ...selectedAddress,
            zipcode: selectedAddress.zip_code,
          },
        ],
        transactions: [
          {
            holder_name: customer.name ?? '',
            holder_document:
              (customer.type === 'f' ? customer.cpf : customer.cnpj) ?? '',
            installments: 1,
            customer_id: customer.id ?? 0,
            status: 'waiting_payment',
            amount: amount,
            authorized_at: date.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          },
        ],
      })
      console.log({ response })
      // if (response) {
      // router.push(ROUTES.paymentResult + `?paymentMethod=${paymentMethod}`)
      // }
    } catch (error) {
      api.handleError(error)
    }
  }

  async function createTransaction(
    paymentMethod: PaymentMethod,
    cardToken?: string
  ) {
    const products = getSelectedSkus()
    console.log({ products })
    if (!customer || !products || !shipmentService) return

    try {
      const transaction = await api.createTransaction({
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
        products: products.map((product) => ({
          id: product.id.toString(),
          name: product.name,
          price: product.price_sale,
          height: product.height,
          length: product.length,
          weight: product.weight,
          width: product.width,
          sku: product.sku,
          quantity: product.quantity,
        })),
        paymentMethod,
        shipmentService,
        cardToken,
      })
      if (
        transaction.status === 'approved' ||
        transaction.status === 'pending'
      ) {
        await saveOrder(transaction.status)
      }
    } catch (error) {
      api.handleError(error)
    }
  }

  function handlePaymentMethodChange(paymentMethod: string) {
    console.log({ paymentMethod })
    setSelectedPaymentMethod(paymentMethod as PaymentMethod)
  }

  return {
    selectedPaymentMethod,
    totalToPay: totalToPay + Number(shipmentService?.price),
    createTransaction,
    handlePaymentMethodChange,
  }
}
