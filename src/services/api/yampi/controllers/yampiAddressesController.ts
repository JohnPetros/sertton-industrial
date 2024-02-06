import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Address } from '@/@types/address'
import { IAdressesController } from '@/services/api/interfaces/IAddressesController'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiAddressesController(
  http: IHttpProvider
): Omit<IAdressesController, 'getAddressByZipcode'> {
  return {
    async getAddressesByCustomerId(customerId: number): Promise<Address[]> {
      const response = await http.get<{ data: Address[] }>(
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
      await http.post(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}`,
        {
          ...address,
          zipcode: address.zip_code,
        }
      )
    },

    async updateAddress(address: Address, customerId: number) {
      await http.put(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}/${address.id}`,
        {
          ...address,
          zipcode: address.zip_code,
        }
      )
    },

    async deleteAddress(addressId: number, customerId: number) {
      await http.delete(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}/${addressId}`
      )
    },
  }
}
