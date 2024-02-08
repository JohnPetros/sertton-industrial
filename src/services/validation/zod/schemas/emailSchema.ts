import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/utils/validationErrors'
import { REGEX } from '@/utils/constants/regex'

export const emailSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .regex(REGEX.email, VALIDATION_ERRORS.email.regex)
