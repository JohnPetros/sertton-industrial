import { z } from 'zod'

import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'

export const citySchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})
