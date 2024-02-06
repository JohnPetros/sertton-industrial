import type { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Transaction } from '@/@types/transaction'
import { CreateTransactionRequest } from '@/services/api/interfaces/IPaymentController'
import { IPaymentController } from '@/services/api/interfaces/IPaymentController'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiPaymentController(
  http: IHttpProvider
): IPaymentController {
  return {
    async createTransaction({
      customer,
      products,
      paymentMethod,
      cardToken,
      shipmentService,
    }: CreateTransactionRequest) {
      const response = await http.post<Transaction>(
        `/${Resources.PAYMENT}/transaction/${paymentMethod}`,
        { customer, products, shipmentService, cardToken }
      )

      return response
    },
  }
}
