import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/utils/validationErrors'
import { REGEX } from '@/utils/constants/regex'

export const creditCardExpirationDateSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(4, VALIDATION_ERRORS.creditCardExpirationDate.length)
  .regex(REGEX.number, VALIDATION_ERRORS.number)
