import type { Brand } from '@/@types/brand'

export interface IBrandsController {
  getBrands(): Promise<Brand[]>
}
