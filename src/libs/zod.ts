import { z } from 'zod'

import { REGEX } from '@/utils/constants/regex'
import { VALIDATION_ERRORS } from '@/utils/constants/validationErrors'

const nameSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .regex(REGEX.fullname, VALIDATION_ERRORS.fullname.regex)

export const emailSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .regex(REGEX.email, VALIDATION_ERRORS.email.regex)

const cpfSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(11, VALIDATION_ERRORS.cpf.length)

const cnpjSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(14, VALIDATION_ERRORS.cnpj.length)

const phoneSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(11, VALIDATION_ERRORS.phone.length)

const razaoSocialSchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})

export const zipcodeSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(8, VALIDATION_ERRORS.zipcode.length)

const citySchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})

const streetSchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})

const neighborhoodSchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})

const ufSchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})

const creditCardNumberSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(16, VALIDATION_ERRORS.creditCardNumber.length)

const securyCodeSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .min(3, VALIDATION_ERRORS.creditCardSecurityCode.min)
  .max(4, VALIDATION_ERRORS.creditCardSecurityCode.max)

const addressNumber = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .min(1, VALIDATION_ERRORS.addressNumber.min)

const creditCardExpirationDateSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(4, VALIDATION_ERRORS.creditCardExpirationDate.length)

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
  number: addressNumber,
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
  securityCode: securyCodeSchema,
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
