import type { Address } from '@/@types/address'
export interface IAddressesController {
  getAddressesByCustomerId(customerId: string): Promise<Address[]>
  getAddressByZipcode(
    zipcode: string
  ): Promise<Omit<Address, 'number' | 'receiver' | 'id'> | null>
  saveAddress(address: Omit<Address, 'id'>, customerId: string): Promise<void>
  updateAddress(address: Address, customerId: string): Promise<void>
  deleteAddress(addressId: string, customerId: string): Promise<void>
}
