import type { IHttpProvider } from '../../http/interfaces/IHttp'
import type { ICreditCardController } from '../../interfaces/ICreditCardController'

import type { CreditCard } from '@/@types/creditCard'
import { removeAccents } from '@/utils/helpers/removeAccents'

export function creditCardController(
  http: IHttpProvider
): ICreditCardController {
  return {
    async tokenizeCard(creditCard: CreditCard) {
      const expirationDateMonth = creditCard.expirationDate.slice(0, 2)
      const expirationDateYear = creditCard.expirationDate.slice(2)

      const response = await http.post<{ id: string; errors?: { key: '' } }>(
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

      return response.id
    },
  }
}
