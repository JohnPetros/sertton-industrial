import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/utils/validationErrors'

export const citySchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})
