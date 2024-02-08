import { IApi } from './interfaces/IApi'
import { useHttp } from './http'
import { useSertton } from './sertton'
import { useYampi } from './yampi'

export function useApi(): IApi {
  const yampi = useYampi()
  const sertton = useSertton()

  const http = useHttp()

  const api = {
    ...yampi,
    ...sertton,
    handleError: <Error>(error: unknown) => http.handleError<Error>(error),
  }

  return api
}
