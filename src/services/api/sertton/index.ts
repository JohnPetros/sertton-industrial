import { useMemo } from 'react'

import { useHttp } from '../http'

import { paymentController } from './controllers/paymentController'
import { shipmentServiceController } from './controllers/shipmentServiceController'

import { testEnvVars } from '@/_tests_/configs/testEnvVars'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

const SHIPMENT_SERVICE_BASE_URL = !IS_TEST_ENV
  ? process.env.SHIPMENT_SERVICE_BASE_URL
  : `http://localhost/${testEnvVars.API_BASE_URL}/${testEnvVars.ALIAS}`

export function useSertton() {
  if (!SHIPMENT_SERVICE_BASE_URL) throw new Error('Ivalid Sertton Base Url')

  const http = useHttp()

  http.init()
  http.setBaseUrl(SHIPMENT_SERVICE_BASE_URL)

  return useMemo(
    () => ({
      ...paymentController(http),
      ...shipmentServiceController(http),
    }),
    [http]
  )
}
