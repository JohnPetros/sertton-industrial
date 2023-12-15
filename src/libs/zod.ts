import { z } from 'zod'

import { REGEX } from '@/utils/constants/regex'

const nameSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .regex(REGEX.fullname, 'Digite seu nome completo e sem espaço no final')

export const emailSchema = z
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

const streetSchema = z.string({
  required_error: 'Campo obrigatório',
})

const neighborhoodSchema = z.string({
  required_error: 'Campo obrigatório',
})

const ufSchema = z.string({
  required_error: 'Campo obrigatório',
})

const creditCardNumberSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .length(16, 'Número do cartão deve conter 16 caracteres')

const securyCodeSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .max(4)

const number = z.string({
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
  number: number,
  zipcode: zipcodeSchema,
  city: citySchema,
  street: streetSchema,
  uf: ufSchema,
  neighborhood: neighborhoodSchema,
  complement: complementSchema,
  receiver: nameSchema,
})

const creditCardFormSchema = z.object({
  number: creditCardNumberSchema,
  cpf: cpfSchema,
  name: nameSchema,
  securityCode: creditCardNumberSchema,
  expirationDate: creditCardExpirationDateSchema,
})

export type NaturalPersonFormFields = z.infer<typeof naturalPersonFormSchema>
export type LegalPersonFormFields = z.infer<typeof legalPersonFormSchema>
export type AddressFormFields = z.infer<typeof addressFormSchema>
export type CreditCardFormFields = z.infer<typeof creditCardFormSchema>

export {
  addressFormSchema,
  creditCardFormSchema,
  legalPersonFormSchema,
  naturalPersonFormSchema,
}
