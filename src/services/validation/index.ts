import { IValidationProvider } from '@/providers/interfaces/IValidationProvider'

let validation: IValidationProvider

export function initializeValidationProvider(
  validationProvider: IValidationProvider
) {
  validation = validationProvider
}

export function useValidation() {
  return validation
}
