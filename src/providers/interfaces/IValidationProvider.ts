import { Resolver } from 'react-hook-form'

import { AddressForm } from '@/services/validation/types/AddressForm'
import { CreditCardForm } from '@/services/validation/types/CreditCardForm'
import { LegalPersonForm } from '@/services/validation/types/LegalPersonForm'
import { NaturalPersonForm } from '@/services/validation/types/NaturalPersonForm'

type ValidationResult = {
  isValid: boolean
  errors: string[]
}

export interface IValidationProvider {
  validateEmail(email: string): ValidationResult
  validateZipcode(zipcode: string): ValidationResult
  validateCpf(cpf: string): ValidationResult
  validateCnpj(cnpj: string): ValidationResult
  resolveAddressForm(): Resolver<AddressForm>
  resolveLegalPersonForm(): Resolver<LegalPersonForm>
  resolveNaturalPersonForm(): Resolver<NaturalPersonForm>
  resolveCreditCardform(): Resolver<CreditCardForm>
}
