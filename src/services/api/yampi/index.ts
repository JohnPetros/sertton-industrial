import { useMemo } from 'react'

import { useHttp } from '../http'

import { testEnvVars } from '@/_tests_/configs/testEnvVars'
import { paymentController } from '@/services/api/sertton/controllers/paymentController'
import { shipmentServiceController } from '@/services/api/sertton/controllers/shipmentServiceController'
import { addressesController } from '@/services/api/yampi/controllers/addressesController'
import { bannersController } from '@/services/api/yampi/controllers/bannersController'
import { brandsController } from '@/services/api/yampi/controllers/brandsController'
import { categoriesController } from '@/services/api/yampi/controllers/categoriesController'
import { checkoutController } from '@/services/api/yampi/controllers/checkoutController'
import { collectionsController } from '@/services/api/yampi/controllers/collectionsController'
import { commentsController } from '@/services/api/yampi/controllers/commentsController'
import { customersController } from '@/services/api/yampi/controllers/customersController'
import { discountsController } from '@/services/api/yampi/controllers/discountsController'
import { leadsController } from '@/services/api/yampi/controllers/leadsController'
import { ordersController } from '@/services/api/yampi/controllers/ordersController'
import { productsController } from '@/services/api/yampi/controllers/productsController'
import { reviewsController } from '@/services/api/yampi/controllers/reviewsController'
import { skusController } from '@/services/api/yampi/controllers/skusController'
import { variationsController } from '@/services/api/yampi/controllers/variationsController'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

const BASE_URL = !IS_TEST_ENV
  ? process.env.YAMPI_BASE_URL
  : `http://localhost/${testEnvVars.API_BASE_URL}/${testEnvVars.ALIAS}`

const ALIAS = !IS_TEST_ENV ? process.env.ALIAS : testEnvVars.ALIAS

const TOKEN = !IS_TEST_ENV ? process.env.YAMPI_TOKEN : testEnvVars.YAMPI_TOKEN

const SECRET_KEY = !IS_TEST_ENV
  ? process.env.YAMPI_SECRET_KEY
  : testEnvVars.YAMPI_SECRET_KEY

export function useYampi() {
  if (!BASE_URL || !ALIAS || !TOKEN || !SECRET_KEY) {
    throw new Error('invalid Yampi env vars')
  }

  const http = useHttp()

  return useMemo(() => {
    http.start()
    http.setBaseUrl(`${BASE_URL}/${ALIAS}`)
    http.setHeader('User-Token', TOKEN)
    http.setHeader('User-Secret-Key', SECRET_KEY)

    return {
      ...brandsController(http),
      ...categoriesController(http),
      ...customersController(http),
      ...collectionsController(http),
      ...productsController(http),
      ...variationsController(http),
      ...skusController(http),
      ...commentsController(http),
      ...reviewsController(http),
      ...addressesController(http),
      ...ordersController(http),
      ...paymentController(http),
      ...shipmentServiceController(http),
      ...leadsController(http),
      ...bannersController(http),
      ...discountsController(http),
      ...checkoutController(http),
    }
  }, [http])
}
