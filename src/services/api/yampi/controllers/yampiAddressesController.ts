import { IHttpProvider } from '../../http/interfaces/IHttp'
import { yampiAddressReverseAdapter } from '../adapters/reverse/yampiAddressReverseAdapter'
import { yampiAddressAdapter } from '../adapters/yampiAddressAdapter'
import type { YampiAddress } from '../types/YampiAddress'

import type { Address } from '@/@types/address'
import { IAddressesController } from '@/services/api/interfaces/IAddressesController'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiAddressesController(
  http: IHttpProvider
): Omit<IAddressesController, 'getAddressByZipcode'> {
  return {
    async getAddressesByCustomerId(customerId: string): Promise<Address[]> {
      const response = await http.get<{ data: YampiAddress[] }>(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}`
      )

      const addresses: Address[] = response.data.map(yampiAddressAdapter)

      return addresses
    },

    async saveAddress(address: Address, customerId: string) {
      await http.post(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}`,
        {
          ...address,
          zipcode: address.zipcode,
        }
      )
    },

    async updateAddress(address: Address, customerId: string) {
      const yampiAddress = yampiAddressReverseAdapter(address)

      await http.put<YampiAddress>(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}/${address.id}`,

        yampiAddress
      )
    },

    async deleteAddress(addressId: string, customerId: string) {
      await http.delete(
        `${Resources.CUSTOMERS}/${customerId}/${Resources.ADDRESSES}/${addressId}`
      )
    },
  }
}
