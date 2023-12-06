import type { Api } from '@/@types/api'
import { adressesService } from '@/services/api/adressesServices'
import { brandsService } from '@/services/api/brandsService'
import { categoriesService } from '@/services/api/categoriesService'
import { collectionsService } from '@/services/api/collectionsService'
import { commentsService } from '@/services/api/commentsService'
import { customersService } from '@/services/api/customersService'
import { logisticsService } from '@/services/api/logisticsService'
import { productsService } from '@/services/api/productsService'
import { reviewsService } from '@/services/api/reviewsService'
import { skusService } from '@/services/api/skusService'
import { variationsService } from '@/services/api/variationsService'

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
    throw new Error('invalid api env vars')
  }

  api.setBaseUrl(`${BASE_URL}/${ALIAS}`)
  api.setHeader('User-Token', TOKEN)
  api.setHeader('User-Secret-Key', SECRET_KEY)

  return {
    ...brandsService(api),
    ...categoriesService(api),
    ...customersService(api),
    ...collectionsService(api),
    ...logisticsService(api),
    ...productsService(api),
    ...variationsService(api),
    ...skusService(api),
    ...commentsService(api),
    ...reviewsService(api),
    ...adressesService(api),
    handleError: (error: unknown) => api.handleError(error),
  }
}
