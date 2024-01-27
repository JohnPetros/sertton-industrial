import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/config/validationErrors'
import { REGEX } from '@/utils/constants/regex'

export const securyCodeSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .min(3, VALIDATION_ERRORS.creditCardSecurityCode.min)
  .max(4, VALIDATION_ERRORS.creditCardSecurityCode.max)
  .regex(REGEX.number, VALIDATION_ERRORS.number)
