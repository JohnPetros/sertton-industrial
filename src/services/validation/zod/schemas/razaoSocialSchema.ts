import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/config/validationErrors'
import { REGEX } from '@/utils/constants/regex'

export const razaoSocialSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .regex(REGEX.number, VALIDATION_ERRORS.number)
