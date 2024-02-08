import { IApi } from '../interfaces/IApi'

import { inMemoryBannersController } from './controllers/inMemoryBannersController'
import { inMemoryBrandsController } from './controllers/inMemoryBrandsController'
import { inMemoryCollectionsController } from './controllers/inMemoryCollectionsController'

export function useInMemoryApi(): IApi {
  return {
    ...inMemoryCollectionsController(),
    ...inMemoryBrandsController(),
    ...inMemoryBannersController(),
  } as IApi
}
