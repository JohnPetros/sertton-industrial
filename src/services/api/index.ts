import { useMemo } from 'react'

import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { addressesController } from '@/services/api/addressesController'
import { bannersController } from '@/services/api/bannersController'
import { brandsController } from '@/services/api/brandsController'
import { categoriesController } from '@/services/api/categoriesController'
import { collectionsController } from '@/services/api/collectionsController'
import { commentsController } from '@/services/api/commentsController'
import { customersController } from '@/services/api/customersController'
import { discountsController } from '@/services/api/discountsController'
import { leadsController } from '@/services/api/leadsController'
import { ordersController } from '@/services/api/ordersController'
import { paymentController } from '@/services/api/paymentController'
import { productsController } from '@/services/api/productsController'
import { reviewsController } from '@/services/api/reviewsController'
import { shipmentServiceController } from '@/services/api/shipmentServiceController'
import { skusController } from '@/services/api/skusController'
import { variationsController } from '@/services/api/variationsController'

let api: IApiProvider

export function initializeApiProvider(apiProvider: IApiProvider) {
  api = apiProvider
}

export function useApi() {
  if (!api) {
    throw new Error('useApi must be used with a api provider')
  }

  api.setDefaultConfig()

  return useMemo(
    () => ({
      ...brandsController(api),
      ...categoriesController(api),
      ...customersController(api),
      ...collectionsController(api),
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
      ...bannersController(api),
      ...discountsController(api),
      handleError: <Error>(error: unknown) => api.handleError<Error>(error),
    }),
    [api]
  )
}
