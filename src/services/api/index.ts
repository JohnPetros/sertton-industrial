import type { Api } from '@/@types/api'
import { addressesController } from '@/services/api/addressesController'
import { brandsController } from '@/services/api/brandsService'
import { categoriesController } from '@/services/api/categoriesService'
import { collectionsController } from '@/services/api/collectionsService'
import { commentsController } from '@/services/api/commentsService'
import { customersController } from '@/services/api/customersService'
import { logisticsController } from '@/services/api/logisticsService'
import { productsController } from '@/services/api/productsService'
import { reviewsController } from '@/services/api/reviewsService'
import { skusController } from '@/services/api/skusService'
import { variationsController } from '@/services/api/variationsService'

const BASE_URL = process.env.YAMPI_BASE_URL
const ALIAS = process.env.ALIAS
const TOKEN = process.env.YAMPI_TOKEN
const SECRET_KEY = process.env.YAMPI_SECRET_KEY

let api: Api

export function initializeApi(initialApi: Api) {
  api = initialApi
}

export function useApi() {
  if (!api) {
    throw new Error('useApi must be used with a api instance')
  }

  if (!BASE_URL || !ALIAS || !TOKEN || !SECRET_KEY) {
    throw new Error('invalid API env vars')
  }

  api.setBaseUrl(`${BASE_URL}/${ALIAS}`)
  api.setHeader('User-Token', TOKEN)
  api.setHeader('User-Secret-Key', SECRET_KEY)

  return {
    ...brandsController(api),
    ...categoriesController(api),
    ...customersController(api),
    ...collectionsController(api),
    ...logisticsController(api),
    ...productsController(api),
    ...variationsController(api),
    ...skusController(api),
    ...commentsController(api),
    ...reviewsController(api),
    ...addressesController(api),
    handleError: (error: unknown) => api.handleError(error),
  }
}
