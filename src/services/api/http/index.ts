import { IHttpProvider } from './interfaces/IHttp'

let http: () => IHttpProvider

export function initializeHttpProvider(httpProvider: () => IHttpProvider) {
  http = httpProvider
}

export function useHttp() {
  if (!http) {
    throw new Error('useHttp must be used with a http provider')
  }

  return http()
}
