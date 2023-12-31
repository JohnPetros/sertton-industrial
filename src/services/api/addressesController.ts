import { envVarsConfig } from '@/_tests_/configs/envVarsConfig'
import type { Address } from '@/@types/address'
import type { Api } from '@/@types/api'
import {
  GetAddressByZipcodeResponse,
  IAdressesController,
} from '@/services/api/interfaces/IAddressesService'
import { Resources } from '@/services/api/resources'
import { getOnlyNumbers } from '@/utils/helpers/getOnlyNumbers'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

const BASE_URL = !IS_TEST_ENV
  ? process.env.VIA_CEP_BASE_URL
  : envVarsConfig.API_BASE_URL

export function addressesController(api: Api): IAdressesController {
  return {
    async getAddressByZipcode(
      zipcode: string
    ): Promise<Omit<Address, 'number' | 'receiver' | 'id'> | null> {
      if (!BASE_URL) throw new Error()

      api.setBaseUrl(BASE_URL)

      const data = await api.get<GetAddressByZipcodeResponse>(
        `/${zipcode}/json/`
      )

      if (data.erro) return null

      return {
        uf: data.uf,
        city: data.localidade,
        street: data.logradouro,
        neighborhood: data.bairro,
        zip_code: getOnlyNumbers(data.cep),
      }
    },

    async getAddressesByCustomerId(customerId: number): Promise<Address[]> {
      const response = await api.get<{ data: Address[] }>(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}`
      )

      return response.data
    },

    async saveAddress(address: Address, customerId: number) {
      await api.post(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}`,
        {
          ...address,
          zipcode: address.zip_code,
        }
      )
    },

    async updateAddress(address: Address, customerId: number) {
      await api.put(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}/${address.id}`,
        {
          ...address,
          zipcode: address.zip_code,
        }
      )
    },

    async deleteAddress(addressId: number, customerId: number) {
      await api.delete(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}/${addressId}`
      )
    },
  }
}
