import { http, HttpResponse } from 'msw'

import { testEnvVars } from './testEnvVars'

export const testApi = {
  BASE_URL: `http://localhost/${testEnvVars.API_BASE_URL}/${testEnvVars.ALIAS}`,
  DEFAULT_HANDLERS: [
    http.get('http://127.0.0.1:50518/', () => {
      return HttpResponse.json(false)
    }),
  ],
}
