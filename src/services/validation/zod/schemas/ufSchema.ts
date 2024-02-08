import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/utils/validationErrors'

export const ufSchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})
