import { useHttp } from '../http'
import { IAdressesController } from '../interfaces/IAddressesController'

import { ViaCepAddress } from './types/viaCepAddress'

import { testEnvVars } from '@/_tests_/configs/testEnvVars'
import { Address } from '@/@types/address'
import { getOnlyNumbers } from '@/utils/helpers/getOnlyNumbers'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

const BASE_URL = !IS_TEST_ENV
  ? process.env.VIA_CEP_BASE_URL
  : `http://localhost/${testEnvVars.API_BASE_URL}/${testEnvVars.ALIAS}`

export function useViaCep(): Pick<IAdressesController, 'getAddressByZipcode'> {
  if (!BASE_URL) throw new Error('Ivalid Via Cep Base Url')

  const http = useHttp()

  http.init()

  http.setBaseUrl(BASE_URL)

  return {
    async getAddressByZipcode(
      zipcode: string
    ): Promise<Omit<Address, 'number' | 'receiver' | 'id'> | null> {
      const data = await http.get<ViaCepAddress>(`/${zipcode}/json/`)

      if (data.erro) return null

      return {
        uf: data.uf,
        city: data.localidade,
        street: data.logradouro,
        neighborhood: data.bairro,
        zip_code: getOnlyNumbers(data.cep),
      }
    },
  }
}
