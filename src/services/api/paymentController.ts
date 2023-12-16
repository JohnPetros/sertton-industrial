import type { Api } from '@/@types/api'
import type { CreditCard } from '@/@types/creditCard'
import { CheckoutRequest } from '@/services/api/interfaces/IPaymentController'
import { IPaymentController } from '@/services/api/interfaces/IPaymentController'
import { Resources } from '@/services/api/resources'
import { removeAccents } from '@/utils/helpers/removeAccents'

const SHIPMENT_SERVICE_BASE_URL = process.env.SHIPMENT_SERVICE_BASE_URL
const PAGAR_ME_API_URL =
  process.env.PAGAR_ME_API_URL ?? 'https://api.pagar.me/core/v5'
const PAGAR_ME_PUBLIC_KEY =
  process.env.PAGAR_ME_PUBLIC_KEY ?? 'pk_test_BZWPlABHzhPj0K74'

export function paymentController(api: Api): IPaymentController {
  if (!SHIPMENT_SERVICE_BASE_URL)
    throw new Error('SHIPMENT SERVICE BASE URL must be provided')

  return {
    async checkout({ customer, products }: CheckoutRequest) {
      api.setBaseUrl(SHIPMENT_SERVICE_BASE_URL)

      const response = await api.post<{ checkoutUrl: string }>(
        `/${Resources.PAYMENT}/checkout`,
        { customer, products }
      )

      api.setDefaultConfig()

      return response.checkoutUrl
    },
    async tokenizeCreditCard(creditCard: CreditCard) {
      if (!PAGAR_ME_API_URL) throw new Error('PAGARME API URL must be provided')
      if (!PAGAR_ME_PUBLIC_KEY)
        throw new Error('PAGARME PUBLIC KEY must be provided')

      api.setBaseUrl(PAGAR_ME_API_URL)
      api.setParams('appId', PAGAR_ME_PUBLIC_KEY)

      const expirationDateMonth = creditCard.expirationDate.slice(0, 2)
      const expirationDateYear = creditCard.expirationDate.slice(2)

      const response = await api.post<{ id: string; errors?: { key: '' } }>(
        `/tokens`,
        {
          type: 'card',
          card: {
            number: creditCard.number,
            holder_name: removeAccents(creditCard.name),
            holder_docuement: creditCard.cpf,
            exp_month: expirationDateMonth,
            exp_year: expirationDateYear,
            cvv: creditCard.securityCode,
          },
        }
      )

      api.setDefaultConfig()

      return response.id
    },
  }
}
