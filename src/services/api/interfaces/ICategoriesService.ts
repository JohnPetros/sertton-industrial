import type { Category } from '@/@types/category'

export interface ICategoriesController {
  getCategories(): Promise<Category[]>
  getCategoryById(categoryId: string): Promise<Category | null>
}
