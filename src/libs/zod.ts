import { z } from 'zod'

import { REGEX } from '@/utils/constants/regex'

const nameSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .regex(REGEX.fullname, 'Digite seu nome completo')

const emailSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .regex(REGEX.email, 'E-mail inválido')

const cpfSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .max(11)

const cnpjSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .max(14)

const phoneSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .max(11)

const razaoSocialSchema = z.string({
  required_error: 'Campo obrigatório',
})

export const zipcodeSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .length(8)

const citySchema = z.string({
  required_error: 'Campo obrigatório',
})

const numberSchema = z.string({
  required_error: 'Campo obrigatório',
})

const streetSchema = z.string({
  required_error: 'Campo obrigatório',
})

const neighborhoodSchema = z.string({
  required_error: 'Campo obrigatório',
})

const ufSchema = z.string({
  required_error: 'Campo obrigatório',
})

const creditCardExpirationDateSchema = z.string({
  required_error: 'Campo obrigatório',
})

const complementSchema = z.string().optional()

const naturalPersonFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  phone: phoneSchema,
})

const legalPersonFormSchema = z.object({
  razaoSocial: razaoSocialSchema,
  email: emailSchema,
  cnpj: cnpjSchema,
  phone: phoneSchema,
})

const addressFormSchema = z.object({
  number: numberSchema,
  zipcode: zipcodeSchema,
  city: citySchema,
  street: streetSchema,
  uf: ufSchema,
  neighborhood: neighborhoodSchema,
  complement: complementSchema,
  receiver: nameSchema,
})

const creditFormSchema = z.object({
  number: numberSchema,
  cpf: cpfSchema,
  name: nameSchema,
})

export type NaturalPersonFormFields = z.infer<typeof naturalPersonFormSchema>
export type LegalPersonFormFields = z.infer<typeof legalPersonFormSchema>
export type AddressFormFields = z.infer<typeof addressFormSchema>

export { addressFormSchema, legalPersonFormSchema, naturalPersonFormSchema }
