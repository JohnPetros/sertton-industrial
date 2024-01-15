import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/config/validationErrors'

export const cnpjSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(14, VALIDATION_ERRORS.cnpj.length)
