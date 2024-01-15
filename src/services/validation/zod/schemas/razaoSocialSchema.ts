import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/config/validationErrors'

export const razaoSocialSchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})
