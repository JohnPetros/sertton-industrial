import { http, HttpResponse } from 'msw'

import { envVarsConfig } from './envVarsConfig'

export const apiConfig = {
  BASE_URL: `http://localhost/${envVarsConfig.API_BASE_URL}/${envVarsConfig.ALIAS}`,
  DEFAULT_HANDLERS: [
    http.get('http://127.0.0.1:50518/', () => {
      return HttpResponse.json(false)
    }),
  ],
}
