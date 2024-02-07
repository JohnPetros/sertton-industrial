import { inMemoryBrandsController } from './controllers/inBrandsController'

export function useInMemory() {
  return {
    ...inMemoryBrandsController(),
  }
}
