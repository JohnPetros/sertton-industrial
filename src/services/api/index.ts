import type { Api } from '@/@types/api'
import { brandsService } from '@/services/api/brandsService'
import { categoriesService } from '@/services/api/categoriesService'
import { collectionsService } from '@/services/api/collectionsService'
import { commentsService } from '@/services/api/commentsService'
import { logisticsService } from '@/services/api/logisticsService'
import { productsService } from '@/services/api/productsService'
import { reviewsService } from '@/services/api/reviewsService'
import { skusService } from '@/services/api/skusService'
import { variationsService } from '@/services/api/variationsService'

let api: Api

export function initializeApi(initialApi: Api) {
  api = initialApi
}

export function useApi() {
  if (!api) {
    throw new Error('useApi must be used with a api instance')
  }

  return {
    ...brandsService(api),
    ...categoriesService(api),
    ...collectionsService(api),
    ...logisticsService(api),
    ...productsService(api),
    ...variationsService(api),
    ...skusService(api),
    ...commentsService(api),
    ...reviewsService(api),
  }
}
