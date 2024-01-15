import { z } from 'zod'

import { cpfSchema } from './cpfSchema'
import { creditCardExpirationDateSchema } from './creditCardExpirationDateSchema'
import { creditCardNumberSchema } from './creditCardNumberSchema'
import { nameSchema } from './nameSchema'
import { securyCodeSchema } from './securyCodeSchema'

export const creditCardFormSchema = z.object({
  number: creditCardNumberSchema,
  cpf: cpfSchema,
  name: nameSchema,
  securityCode: securyCodeSchema,
  expirationDate: creditCardExpirationDateSchema,
})
