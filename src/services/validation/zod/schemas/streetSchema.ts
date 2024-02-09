import { z } from 'zod'

import { VALIDATION_ERRORS } from '../../constants/validation-errors'

export const streetSchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})
