import type { Category } from '@/@types/category'

export interface ICategoriesController {
  getCategories(): Promise<Category[]>
  getCategory(categoryId: number): Promise<Category>
}
