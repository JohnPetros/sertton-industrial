import { useMemo } from 'react'

import { useHttp } from '../http'

import { testEnvVars } from '@/_tests_/configs/testEnvVars'
import { yampiPaymentController } from '@/services/api/sertton/controllers/paymentController'
import { yampiAddressesController } from '@/services/api/yampi/controllers/yampiAddressesController'
import { yampiBannersController } from '@/services/api/yampi/controllers/yampiBannersController'
import { yampiBrandsController } from '@/services/api/yampi/controllers/yampibrandsController'
import { yampiCategoriesController } from '@/services/api/yampi/controllers/yampiCategoriesController'
import { yampiCheckoutController } from '@/services/api/yampi/controllers/yampiCheckoutController'
import { yampiCollectionsController } from '@/services/api/yampi/controllers/yampiCollectionsController'
import { yampiCommentsController } from '@/services/api/yampi/controllers/yampiCommentsController'
import { yampiCustomersController } from '@/services/api/yampi/controllers/yampiCustomersController'
import { yampiDiscountsController } from '@/services/api/yampi/controllers/yampiDiscountsController'
import { yampiLeadsController } from '@/services/api/yampi/controllers/yampiLeadsController'
import { yampiOrdersController } from '@/services/api/yampi/controllers/yampiOrdersController'
import { yampiProductsController } from '@/services/api/yampi/controllers/yampiProductsController'
import { yampiReviewsController } from '@/services/api/yampi/controllers/yampiReviewsController'
import { yampiSkusController } from '@/services/api/yampi/controllers/yampiSkusController'
import { yampiVariationsController } from '@/services/api/yampi/controllers/yampiVariationsController'

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
      ...yampiBrandsController(http),
      ...yampiCategoriesController(http),
      ...yampiCustomersController(http),
      ...yampiCollectionsController(http),
      ...yampiProductsController(http),
      ...yampiVariationsController(http),
      ...yampiSkusController(http),
      ...yampiCommentsController(http),
      ...yampiReviewsController(http),
      ...yampiAddressesController(http),
      ...yampiOrdersController(http),
      ...yampiPaymentController(http),
      ...yampiLeadsController(http),
      ...yampiBannersController(http),
      ...yampiDiscountsController(http),
      ...yampiCheckoutController(http),
    }
  }, [http])
}
