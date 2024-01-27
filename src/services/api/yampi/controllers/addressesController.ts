import type { Address } from '@/@types/address'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { IAdressesController } from '@/services/api/interfaces/IAddressesController'
import { Resources } from '@/services/api/yampi/config/resources'

export function addressesController(
  api: IApiProvider
): Omit<IAdressesController, 'getAddressByZipcode'> {
  return {
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
