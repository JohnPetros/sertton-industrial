import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'
import { REGEX } from '@/utils/constants/regex'

export const nameSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .regex(REGEX.fullname, VALIDATION_ERRORS.fullname.regex)
