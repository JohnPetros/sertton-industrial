import { z } from 'zod'

import { cnpjSchema } from './cnpjSchema'
import { emailSchema } from './emailSchema'
import { phoneSchema } from './phoneSchema copy'
import { razaoSocialSchema } from './razaoSocialSchema'

export const legalPersonFormSchema = z.object({
  razaoSocial: razaoSocialSchema,
  email: emailSchema,
  cnpj: cnpjSchema,
  phone: phoneSchema,
})
