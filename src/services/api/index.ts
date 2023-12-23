import { useMemo } from 'react'

import type { Api } from '@/@types/api'
import { addressesController } from '@/services/api/addressesController'
import { brandsController } from '@/services/api/brandsController'
import { categoriesController } from '@/services/api/categoriesController'
import { collectionsController } from '@/services/api/collectionsController'
import { commentsController } from '@/services/api/commentsController'
import { customersController } from '@/services/api/customersController'
import { leadsController } from '@/services/api/leadsController'
import { logisticsController } from '@/services/api/logisticsController'
import { ordersController } from '@/services/api/ordersController'
import { paymentController } from '@/services/api/paymentController'
import { productsController } from '@/services/api/productsController'
import { reviewsController } from '@/services/api/reviewsController'
import { shipmentServiceController } from '@/services/api/shipmentServiceController'
import { skusController } from '@/services/api/skusController'
import { variationsController } from '@/services/api/variationsController'

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

  api.setDefaultConfig()

  return useMemo(
    () => ({
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
      ...ordersController(api),
      ...paymentController(api),
      ...shipmentServiceController(api),
      ...leadsController(api),
      handleError: (error: unknown) => api.handleError(error),
    }),
    [api]
  )
}
