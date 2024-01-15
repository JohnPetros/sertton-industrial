import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/config/validationErrors'

export const creditCardNumberSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(16, VALIDATION_ERRORS.creditCardNumber.length)
