import { z } from 'zod'

import { cpfSchema } from './cpfSchema'
import { emailSchema } from './emailSchema'
import { nameSchema } from './nameSchema'
import { phoneSchema } from './phoneSchema'

export const naturalPersonFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  phone: phoneSchema,
})
