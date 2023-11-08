import { Category } from '@/@types/category'

export interface ICategoriesService {
  getCategories(): Promise<Category[]>
  getCategory(categoryId: string): Promise<Category>
}
