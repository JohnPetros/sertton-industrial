import { CreditCard } from '@/@types/creditCard'

export interface ICreditCardController {
  tokenizeCard(creditCard: CreditCard): Promise<string>
}
