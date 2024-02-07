import { IBrandsController } from '../../interfaces/IBrandsService'

import { brandsMock } from '@/_tests_/mocks/brandsMock'
import { Brand } from '@/@types/brand'

export function inMemoryBrandsController(): IBrandsController {
  const brands: Brand[] = brandsMock

  return {
    async getBrands() {
      return brands
    },
  }
}
