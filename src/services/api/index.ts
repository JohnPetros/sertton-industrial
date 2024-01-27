import { IApi } from './interfaces/IApi'
import { useHttp } from './http'
import { usePagarme } from './pagarme'
import { useSertton } from './sertton'
import { useViaCep } from './via_cep'
import { useYampi } from './yampi'

export function useApi(): IApi {
  const yampi = useYampi()
  const pagarme = usePagarme()
  const sertton = useSertton()
  const viaCep = useViaCep()

  const http = useHttp()

  return {
    ...yampi,
    ...pagarme,
    ...sertton,
    ...viaCep,
    handleError: <Error>(error: unknown) => http.handleError<Error>(error),
  }
}
