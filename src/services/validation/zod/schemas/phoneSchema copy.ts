import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'

export const phoneSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(11, VALIDATION_ERRORS.phone.length)
