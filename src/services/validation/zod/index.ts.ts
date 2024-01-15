import { zodResolver } from '@hookform/resolvers/zod'

import { addressFormSchema } from './schemas/addressFormSchema'
import { creditCardFormSchema } from './schemas/creditCardFormSchema'
import { emailSchema } from './schemas/emailSchema'
import { legalPersonFormSchema } from './schemas/legalPersonFormSchema'
import { naturalPersonFormSchema } from './schemas/naturalPersonFormSchema'
import { zipcodeSchema } from './schemas/zipcodeSchema'

import type { IValidationProvider } from '@/providers/interfaces/IValidationProvider'

export const zodProvider: IValidationProvider = {
  validateEmail(email: string) {
    const emailValidation = emailSchema.safeParse(email)

    return {
      isValid: emailValidation.success,
      errors: !emailValidation.success
        ? emailValidation?.error.format()._errors
        : [],
    }
  },

  validateZipcode(zipcode: string) {
    const zipcodeValidation = zipcodeSchema.safeParse(zipcode)

    return {
      isValid: zipcodeValidation.success,
      errors: !zipcodeValidation.success
        ? zipcodeValidation?.error.format()._errors
        : [],
    }
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
