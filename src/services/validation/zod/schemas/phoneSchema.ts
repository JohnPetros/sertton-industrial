import { z } from 'zod'

import { VALIDATION_ERRORS } from '../../constants/validation-errors'

import { REGEX } from '@/utils/constants/regex'

export const phoneSchema = z
  .string({
    required_error: VALIDATION_ERRORS.required,
  })
  .length(11, VALIDATION_ERRORS.phone.length)
  .regex(REGEX.number, VALIDATION_ERRORS.number)
