import type { Address } from '@/@types/address'
import type { Api } from '@/@types/api'
import {
  GetAddressByZipcodeResponse,
  IAdressesController,
} from '@/services/api/interfaces/IAddressesService'
import { Resources } from '@/services/api/resources'

const BASE_URL = process.env.VIA_CEP_BASE_URL

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
        zip_code: data.cep,
      }
    },

    async getAddressesByCustomerId(customerId: number): Promise<Address[]> {
      const response = await api.get<{ data: Address[] }>(
        `${Resources.CUSTOMERS}/${customerId}/addresses`
      )

      return response.data
    },

    async saveAddress(address: Address, customerId: number) {
      await api.post(`${Resources.CUSTOMERS}/${customerId}/addresses`, address)
    },

    async updateAddress(address: Address, customerId: number) {
      await api.put(
        `${Resources.CUSTOMERS}/${customerId}/addresses/${address.id}`,
        {
          ...address,
          zipcode: address.zip_code,
        }
      )
    },
  }
}
