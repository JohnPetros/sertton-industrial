import type { YampiCategory } from '../types/YampiCategory'

import type { Category } from '@/@types/category'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export function yampiCategoryAdapter(yampiCategory: YampiCategory) {
  const banner: Category = {
    id: yampiCategory.id,
    name: yampiCategory.name,
    description: removeHTMLTags(yampiCategory.description),
  }

  return banner
}
