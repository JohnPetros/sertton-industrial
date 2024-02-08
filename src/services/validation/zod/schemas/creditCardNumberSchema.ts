import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/utils/validationErrors'
import { REGEX } from '@/utils/constants/regex'

export const creditCardNumberSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(16, VALIDATION_ERRORS.creditCardNumber.length)
  .regex(REGEX.number, VALIDATION_ERRORS.number)
