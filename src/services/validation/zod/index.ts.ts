import { zodResolver } from '@hookform/resolvers/zod'
import { SafeParseReturnType } from 'zod'

import { addressFormSchema } from './schemas/addressFormSchema'
import { cnpjSchema } from './schemas/cnpjSchema'
import { cpfSchema } from './schemas/cpfSchema'
import { creditCardFormSchema } from './schemas/creditCardFormSchema'
import { emailSchema } from './schemas/emailSchema'
import { legalPersonFormSchema } from './schemas/legalPersonFormSchema'
import { naturalPersonFormSchema } from './schemas/naturalPersonFormSchema'
import { zipcodeSchema } from './schemas/zipcodeSchema'

import type { IValidationProvider } from '@/providers/interfaces/IValidationProvider'

function returnValidation(validation: SafeParseReturnType<string, string>) {
  return {
    isValid: validation.success,
    errors: !validation.success ? validation?.error.format()._errors : [],
  }
}

export const zodValidationProvider: IValidationProvider = {
  validateEmail(email: string) {
    const emailValidation = emailSchema.safeParse(email)

    return returnValidation(emailValidation)
  },

  validateCpf(cpf: string) {
    const cpfValidation = cpfSchema.safeParse(cpf)

    return returnValidation(cpfValidation)
  },

  validateCnpj(cnpj: string) {
    const cnpjValidation = cnpjSchema.safeParse(cnpj)

    return returnValidation(cnpjValidation)
  },

  validateZipcode(zipcode: string) {
    const zipcodeValidation = zipcodeSchema.safeParse(zipcode)

    return returnValidation(zipcodeValidation)
  },

  resolveAddressForm() {
    return zodResolver(addressFormSchema)
  },

  resolveLegalPersonForm() {
    return zodResolver(legalPersonFormSchema)
  },

  resolveNaturalPersonForm() {
    return zodResolver(naturalPersonFormSchema)
  },

  resolveCreditCardform() {
    return zodResolver(creditCardFormSchema)
  },
}
