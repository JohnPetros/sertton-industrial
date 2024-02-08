import { z } from 'zod'

import { VALIDATION_ERRORS } from '../../utils/validationErrors'

export const neighborhoodSchema = z.string({
  required_error: VALIDATION_ERRORS.required,
})
