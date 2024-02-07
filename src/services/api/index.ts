import { IApi } from './interfaces/IApi'
import { useHttp } from './http'
import { useInMemory } from './in-memory'
import { useSertton } from './sertton'
import { useYampi } from './yampi'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

export function useApi(): IApi {
  const yampi = useYampi()
  const sertton = useSertton()

  const inMemoryApi = useInMemory()

  if (IS_TEST_ENV) {
    return inMemoryApi as IApi
  }

  const http = useHttp()

  const api = {
    ...yampi,
    ...sertton,
    handleError: <Error>(error: unknown) => http.handleError<Error>(error),
  }

  return api
}
