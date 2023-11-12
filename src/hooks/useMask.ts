import { mask as format } from 'react-native-mask-text'

import type { Mask } from '@/@types/mask'
import { MASKS } from '@/utils/constants/mask'

export function useMask(mask: Mask | undefined) {
  function maskValue(value: string) {
    if (mask) return format(value, MASKS[mask])
    else return value
  }

  return maskValue
}
