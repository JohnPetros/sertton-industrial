import { Category } from '@/@types/category'

export interface ICategoriesService {
  getCategories(): Promise<Category[]>
  getCategory(categoryId: number): Promise<Category>
}
