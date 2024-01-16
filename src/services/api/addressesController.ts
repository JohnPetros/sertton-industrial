import { testApi } from '@/_tests_/configs/testApi'
import type { Address } from '@/@types/address'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Resources } from '@/services/api/config/resources'
import {
  GetAddressByZipcodeResponse,
  IAdressesController,
} from '@/services/api/interfaces/IAddressesService'
import { getOnlyNumbers } from '@/utils/helpers/getOnlyNumbers'

const IS_TEST_ENV = process.env.NODE_ENV === 'test'

const BASE_URL = !IS_TEST_ENV ? process.env.VIA_CEP_BASE_URL : testApi.BASE_URL

export function addressesController(api: IApiProvider): IAdressesController {
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

      const addresses: Address[] = response.data.map((address) => ({
        id: address.id,
        receiver: address.receiver,
        zip_code: address.zip_code,
        street: address.street,
        number: address.number,
        neighborhood: address.neighborhood,
        complement: address.complement,
        city: address.city,
        uf: address.uf,
      }))

      return addresses
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
