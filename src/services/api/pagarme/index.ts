import { useHttp } from '../http'

import { creditCardController } from './controllers/creditCardController'

import { testEnvVars } from '@/_tests_/configs/testEnvVars'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

const PAGAR_ME_API_URL = !IS_TEST_ENV
  ? process.env.PAGAR_ME_API_URL
  : `http://localhost/${testEnvVars.API_BASE_URL}/${testEnvVars.ALIAS}`

const PAGAR_ME_PUBLIC_KEY = !IS_TEST_ENV
  ? process.env.PAGAR_ME_PUBLIC_KEY
  : testEnvVars.PAGARME_PUBLIC_KEY

export function usePagarme() {
  if (!PAGAR_ME_API_URL || !PAGAR_ME_PUBLIC_KEY) {
    throw new Error('invalid Pagar.me env vars')
  }

  const http = useHttp()

  http.init()
  http.setBaseUrl(PAGAR_ME_API_URL)
  http.setParams('appId', PAGAR_ME_PUBLIC_KEY)

  return {
    ...creditCardController(http),
  }
}
