import { testEnvVars } from '@/_tests_/configs/testEnvVars'
import type { CreditCard } from '@/@types/creditCard'
import type { PaymentConfig } from '@/@types/paymentMethod'
import type { Transaction } from '@/@types/transaction'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Resources } from '@/services/api/config/resources'
import { CreateTransactionRequest } from '@/services/api/interfaces/IPaymentController'
import { IPaymentController } from '@/services/api/interfaces/IPaymentController'
import { removeAccents } from '@/utils/helpers/removeAccents'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

const SHIPMENT_SERVICE_BASE_URL = !IS_TEST_ENV
  ? process.env.SHIPMENT_SERVICE_BASE_URL
  : testEnvVars.API_BASE_URL

const PAGAR_ME_API_URL = !IS_TEST_ENV
  ? process.env.PAGAR_ME_API_URL
  : testEnvVars.API_BASE_URL

const PAGAR_ME_PUBLIC_KEY = !IS_TEST_ENV
  ? process.env.PAGAR_ME_PUBLIC_KEY
  : testEnvVars.API_BASE_URL

export function paymentController(api: IApiProvider): IPaymentController {
  if (!SHIPMENT_SERVICE_BASE_URL)
    throw new Error('SHIPMENT SERVICE BASE URL must be provided')

  return {
    async createTransaction({
      customer,
      products,
      paymentMethod,
      cardToken,
      shipmentService,
    }: CreateTransactionRequest) {
      api.setBaseUrl(SHIPMENT_SERVICE_BASE_URL)

      const response = await api.post<Transaction>(
        `/${Resources.PAYMENT}/transaction/${paymentMethod}`,
        { customer, products, shipmentService, cardToken }
      )

      api.setDefaultConfig()

      return response
    },

    async getPaymentConfigs() {
      api.setDefaultConfig()

      const response = await api.get<{ data: PaymentConfig[] }>(
        `/${Resources.CHECKOUT}/payments`
      )

      return response.data
    },

    async tokenizeCard(creditCard: CreditCard) {
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
