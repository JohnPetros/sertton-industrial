import type { Brand } from '@/@types/brand'

export interface IBrandsService {
  getBrands(): Promise<Brand[]>
}
