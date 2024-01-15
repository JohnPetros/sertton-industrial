import { z } from 'zod'

import { addressNumberSchema } from './addressNumberSchema'
import { citySchema } from './citySchema'
import { complementSchema } from './complementSchema'
import { nameSchema } from './nameSchema'
import { neighborhoodSchema } from './neighborhoodSchema'
import { streetSchema } from './streetSchema'
import { ufSchema } from './ufSchema'
import { zipcodeSchema } from './zipcodeSchema'

export const addressFormSchema = z.object({
  number: addressNumberSchema,
  zipcode: zipcodeSchema,
  city: citySchema,
  street: streetSchema,
  uf: ufSchema,
  neighborhood: neighborhoodSchema,
  complement: complementSchema,
  receiver: nameSchema,
})
