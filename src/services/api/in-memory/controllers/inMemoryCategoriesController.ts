import { ICategoriesController } from '../../interfaces/ICategoriesService'

import { categoriesMock } from '@/_tests_/mocks/categoriesMock'
import type { Category } from '@/@types/category'

export function inMemoryCategoriesController(): ICategoriesController {
  const categories: Category[] = categoriesMock

  return {
    async getCategories() {
      return categories
    },

    async getCategoryById(categoryId) {
      return categories.find((category) => category.id === categoryId) ?? null
    },
  }
}
