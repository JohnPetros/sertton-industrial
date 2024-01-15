import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/config/validationErrors'

export const zipcodeSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(8, VALIDATION_ERRORS.zipcode.length)
