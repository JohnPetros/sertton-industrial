import type { YampiVariation } from '../types/YampiVariation'

import { Variation } from '@/@types/variation'

export function yampiVariationAdapter(yampiVariation: YampiVariation) {
  const variation: Variation = {
    id: String(yampiVariation.id),
    name: yampiVariation.name,
    value: yampiVariation.value,
  }

  return variation
}
