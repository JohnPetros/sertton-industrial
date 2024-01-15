import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/config/validationErrors'

export const addressNumberSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .min(1, VALIDATION_ERRORS.addressNumber.min)
