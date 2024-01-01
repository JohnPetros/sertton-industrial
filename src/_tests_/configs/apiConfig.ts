import { http, HttpResponse } from 'msw'

export const apiConfig = {
  BASE_URL: 'http://localhost/msw/alias',
  DEFAULT_HANDLERS: [
    http.get('http://127.0.0.1:50518/', () => {
      return HttpResponse.json(false)
    }),
  ],
}
