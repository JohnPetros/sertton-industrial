import { tokens as defaultTokens } from '@tamagui/themes'
import { createTokens } from 'tamagui'

import { blue, gray, green, red } from './colors'

export const tokens = createTokens({
  ...defaultTokens,
  color: {
    ...defaultTokens.color,
    ...blue,
    ...red,
    ...gray,
    ...green,
  },
})
