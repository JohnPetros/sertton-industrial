import type { YampiBrand } from '../types/YampiBrand'

import type { Brand } from '@/@types/brand'

export function yampiBrandAdapter(yampiBrand: YampiBrand) {
  const banner: Brand = {
    id: yampiBrand.id,
    name: yampiBrand.name,
  }

  return banner
}
